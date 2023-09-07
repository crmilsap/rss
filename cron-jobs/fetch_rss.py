from datetime import datetime
import logging
import time
from typing import List
import feedparser
from sqlalchemy import and_
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


class RegisterArticles:
    def __init__(self) -> None:
        pass

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
                existing_entry = (
                    session.query(Article)
                    .where(
                        and_(
                            Article.link == entry.link, Article.query_id == query_obj.id
                        )
                    )
                    .first()
                )

                if existing_entry is not None:
                    logging.info(f"Skipping Duplicate: {existing_entry.title[:30]}")
                    continue

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
                        title=entry.title.split(" - ")[0],
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

                time.sleep(2)


if __name__ == "__main__":
    RegisterArticles().fetch_rss_feeds()
    logging.info("Execution completed.")
