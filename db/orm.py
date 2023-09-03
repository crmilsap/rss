from sqlalchemy import (
    Table,
    UniqueConstraint,
    create_engine,
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy.sql import func


class DatabaseConfig:
    def __init__(self):
        import os
        from sqlalchemy import create_engine
        from sqlalchemy.orm import sessionmaker

        # Read environment variables
        self.POSTGRES_USER = os.environ.get("POSTGRES_USER", "default_user")
        self.POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "default_password")
        self.POSTGRES_DB = os.environ.get("POSTGRES_DB", "default_db")
        self.DB_HOST = os.environ.get(
            "DB_HOST", "default_host"
        )  # Use service name defined in docker-compose.yml
        self.DB_PORT = os.environ.get("DB_PORT", "5432")

        self.db_url = f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.POSTGRES_DB}"

    def get_engine(self):
        return create_engine(self.db_url)

    def get_session(self):
        self.__session = sessionmaker(
            autocommit=False, autoflush=False, bind=self.get_engine()
        )
        return self.__session()


Base = declarative_base()


class NewsQuery(Base):
    __tablename__ = "news_query"
    id = Column(Integer, primary_key=True)
    query_text = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())

    articles = relationship("Article", back_populates="query")


article_author_association = Table(
    "article_author_association",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("articles.id")),
    Column("author_id", Integer, ForeignKey("authors.id")),
)


class Article(Base):
    __tablename__ = "articles"
    __table_args__ = (UniqueConstraint("query_id", "link", name="uq_query_link"),)

    # Existing fields remain the same
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    link = Column(String, nullable=False)
    pub_date = Column(DateTime(timezone=True))
    retrieved_at = Column(DateTime(timezone=True), default=func.now())
    image = Column(String, nullable=True)
    content = Column(String, nullable=True)

    query_id = Column(Integer, ForeignKey("news_query.id"))
    query = relationship("NewsQuery", back_populates="articles")

    publisher_id = Column(
        Integer, ForeignKey("publishers.id")
    )  # Assuming we also create a Publishers table
    publisher = relationship(
        "Publisher", back_populates="articles"
    )  # Assuming we also create a Publishers table

    # Many-to-many relationship with Authors
    authors = relationship(
        "Author", secondary=article_author_association, back_populates="articles"
    )


class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    articles = relationship(
        "Article", secondary=article_author_association, back_populates="authors"
    )


class Publisher(Base):
    __tablename__ = "publishers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    articles = relationship("Article", back_populates="publisher")
