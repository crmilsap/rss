import newspaper
import random
import time
from db.orm import Article
from sqlalchemy.orm import Session
from scraping.agents import user_agents


class ArticleHandler:
    def __init__(self) -> None:
        pass

    def download(self, url, retries=3, backoff_factor=0.3) -> Article | None:
        config = newspaper.Config()
        config.browser_user_agent = random.choice(user_agents)
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

    def fetch_or_retrieve_article(
        self, articleId: int, session: Session
    ) -> Article | None:
        article = session.query(Article).filter(Article.id == articleId).first()

        if article is None:
            return None
        if article.content and article.image:
            return article

        np_article = self.download(article.link)

        if np_article:
            article.title = np_article.title
            article.content = np_article.text
            article.image = np_article.top_image
            article.link = np_article.canonical_link
            session.commit()

        return article
