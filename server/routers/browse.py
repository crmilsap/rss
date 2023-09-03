from datetime import datetime
import logging
from typing import List, Optional
from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.orm import DatabaseConfig, NewsQuery, Article
from fastapi import APIRouter
import newspaper

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
    pubDate: datetime
    image: str
    content: str
    publisher: str
    authors: List[str]


@browser.get("/articles", response_model=List[ArticleResponse])
def get_topics(
    queryId: Optional[int] = None, session: Session = Depends(db_config.get_session)
):
    query = session.query(Article)
    if queryId is not None:
        query = query.filter(Article.query_id == queryId)

    rows = query.limit(50).all()

    authors = list(map(lambda a: a.name, rows[0].authors))
    logger.info(rows[0].authors)
    logger.info(rows[0].id)
    logger.info(rows[0].publisher.name)

    return list(
        map(
            lambda x: ArticleResponse(
                id=x.id,
                authors=authors,
                content=x.content,
                image=x.image,
                link=x.link,
                pubDate=x.pub_date,
                publisher=x.publisher.name,
                title=x.title,
            ),
            rows,
        )
    )
