from datetime import datetime
import logging
import time
from typing import List
import feedparser
from db.orm import Article, Author, DatabaseConfig, NewsQuery, Publisher
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
import newspaper
import time
import random

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)


class ArticleScraper:
    def __init__(self) -> None:
        pass

    def download_article(self, url, retries=3, backoff_factor=0.3) -> Article | None:
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.3"
        config = newspaper.Config()
        config.browser_user_agent = user_agent
        config.request_timeout = 10

        for i in range(retries):
            try:
                np_article = newspaper.Article(url, config=config)
                np_article.download()
                np_article.parse()
                return np_article
            except newspaper.article.ArticleException as e:
                print(f"Download failed: {e}")
                sleep_time = backoff_factor * (2**i)  # Exponential backoff
                time.sleep(sleep_time + random.uniform(0, 2))  # Adding some jitter
        return None  # Return None after exceeding max retries

    def insert_authors(self, authors: List[str], session: Session) -> List[Author]:
        article_authors: List[Author] = []
        for author_name in authors:
            author = session.query(Author).filter_by(name=author_name).first()
            if author is None:
                author = Author(name=author_name)
                session.add(author)
                session.flush()  # Flush to get the id for the newly created author
            article_authors.append(author)

        return article_authors

    def fetch_rss_feeds(self):
        session = DatabaseConfig().get_session()

        # Fetch all queries from the database
        queries = session.query(NewsQuery).all()

        for query_obj in queries:
            query_text = query_obj.query_text
            query_id = query_obj.id

            rss_url = (
                f'https://news.google.com/rss/search?q={query_text.replace(" ", "+")}'
            )
            feed = feedparser.parse(rss_url)

            logging.info(f"Fetching entries for query: {query_text}")
            for entry in feed.entries:
                try:
                    art = self.download_article(entry.link)

                    authors: List[Author] = self.insert_authors(art.authors, session)

                    link = (
                        art.canonical_link
                        if art.canonical_link is not None
                        else entry.link
                    )

                    publisher_name = entry.source.title
                    publisher = (
                        session.query(Publisher).filter_by(name=publisher_name).first()
                    )
                    if publisher is None:
                        publisher = Publisher(name=publisher_name)
                        session.add(publisher)
                        session.commit()

                    pub_date = datetime.fromtimestamp(
                        time.mktime(entry.published_parsed)
                    )

                    article = Article(
                        query_id=query_id,
                        title=entry.title,
                        link=link,
                        pub_date=pub_date,
                        image=art.top_image,
                        content=art.text,
                    )
                    article.authors = authors
                    article.publisher = publisher

                    session.add(article)
                    session.commit()
                    logging.info(f"Saved entry: {entry.title} ({entry.link})")
                except IntegrityError:
                    session.rollback()
                    logging.info(f"Duplicate entry found, skipping: {entry.link}")

                time.sleep(5)


if __name__ == "__main__":
    ArticleScraper().fetch_rss_feeds()
    logging.info("Execution completed.")
