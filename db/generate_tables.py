from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.sql import func
from decouple import RepositoryEnv, Config

cfg = Config(RepositoryEnv('envs/local.env'))

DB_NAME = cfg('DB_NAME')
DB_USERNAME = cfg('DB_USERNAME')
DB_PASSWORD = cfg('DB_PASSWORD')

Base = declarative_base()

class Query(Base):
    __tablename__ = 'queries'
    id = Column(Integer, primary_key=True)
    query_text = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())

class RSSFeedEntry(Base):
    __tablename__ = 'rss_feed_entries'
    id = Column(Integer, primary_key=True)
    query_id = Column(Integer, ForeignKey('queries.id'))
    title = Column(String, nullable=False)
    link = Column(String, nullable=False)
    description = Column(String)
    pub_date = Column(DateTime(timezone=True))
    retrieved_at = Column(DateTime(timezone=True), default=func.now())

def create_tables():
    db_url = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@localhost/{DB_NAME}"
    engine = create_engine(db_url)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()

