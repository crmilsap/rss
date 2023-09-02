import logging
from typing import List
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from db.orm import DatabaseConfig, RSSFeedEntry, RssQuery
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

app = FastAPI()

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

db_config = DatabaseConfig()


class Topic(BaseModel):
    category: str


@app.get("/topics", response_model=List[Topic])
def get_topics(session: Session = Depends(db_config.get_session)):
    rows = session.query(RssQuery).all()
    return list(map(lambda r: Topic(category=r.query_text), rows))


@app.get("/", response_class=PlainTextResponse)
def hello(session: Session = Depends(db_config.get_session)):
    rows = session.query(RSSFeedEntry).limit(50).all()
    logger.info(rows)

    titles: List[str] = [row.title for row in rows]
    return "\n\n".join(titles)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
