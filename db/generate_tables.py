from typing import Any
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.sql import func
import os

class DatabaseConfig:
    def __init__(self):
        import os
        from sqlalchemy import create_engine
        from sqlalchemy.orm import sessionmaker

        # Read environment variables
        self.POSTGRES_USER = os.environ.get('POSTGRES_USER', 'default_user')
        self.POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD', 'default_password')
        self.POSTGRES_DB = os.environ.get('POSTGRES_DB', 'default_db')
        self.DB_HOST = os.environ.get('DB_HOST', 'default_host')  # Use service name defined in docker-compose.yml
        self.DB_PORT = os.environ.get('DB_PORT', '5432')
        # Create database URL
        self.db_url = f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.POSTGRES_DB}"


    def get_engine(self):
        return create_engine(self.db_url)
    
    def get_session(self):
        self.__session = sessionmaker(autocommit=False, autoflush=False, bind=self.get_engine())
        return self.__session()


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
    db_config = DatabaseConfig()
    Base.metadata.create_all(bind=db_config.get_engine())

if __name__ == "__main__":
    create_tables()

