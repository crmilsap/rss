from datetime import datetime
import logging
from typing import List, Optional
from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.orm import DatabaseConfig, NewsQuery, Article
from fastapi import APIRouter
from scraping.article_handler import ArticleHandler

browser = APIRouter()

db_config = DatabaseConfig()
logger = logging.getLogger(__name__)


class Topic(BaseModel):
    category: str
    id: int


@browser.get("/topics", response_model=List[Topic])
def get_topics(session: Session = Depends(db_config.get_session)):
    rows = session.query(NewsQuery).all()
    return list(map(lambda r: Topic(category=r.query_text, id=r.id), rows))


class ArticleResponse(BaseModel):
    id: int
    title: str
    link: str
    pub_date: datetime
    image: str
    content: Optional[str]
    publisher: str
    authors: List[str]


def convert_article_to_pydantic(
    article: Article, include_content: Optional[bool] = True
):
    authors = list(map(lambda a: a.name, article.authors))
    return ArticleResponse(
        id=article.id,
        authors=authors,
        content=article.content if include_content else None,
        image=article.image,
        link=article.link,
        pub_date=article.pub_date,
        publisher=article.publisher.name,
        title=article.title,
    )


@browser.get("/articles", response_model=List[ArticleResponse])
def get_articles(
    queryId: Optional[int] = None, session: Session = Depends(db_config.get_session)
):
    query = session.query(Article).order_by(Article.pub_date.desc())
    if queryId is not None:
        query = query.filter(Article.query_id == queryId)

    rows = query.limit(50).all()
    return list(
        map(
            lambda x: convert_article_to_pydantic(article=x, include_content=False),
            rows,
        )
    )


@browser.get("/article", response_model=ArticleResponse)
def get_article(articleId: int, session: Session = Depends(db_config.get_session)):
    # article = session.query(Article).filter(Article.id == articleId).one()
    article = ArticleHandler().fetch_or_retrieve_article(articleId, session)
    return convert_article_to_pydantic(article)
