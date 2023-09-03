from orm import Base, DatabaseConfig, NewsQuery


def create_tables():
    db_config = DatabaseConfig()

    engine = db_config.get_engine()
    # Base.metadata.drop_all(engine)  # TODO: use alembic
    Base.metadata.create_all(bind=engine)

    session = db_config.get_session()

    initial_queries = {
        "business",
        "stock market",
        "technology",
        "real estate",
        "cryptocurrency",
        # "bitcoin news",
        # "ethereum news",
        "artificial intelligence",
        # "analyst estimates",
        # "china",
        # "russia",
        # "ukraine",
        # "taiwan",
        "politics",
    }
    existing_queries = set(row.query_text for row in session.query(NewsQuery).all())

    for q in initial_queries - existing_queries:
        new_query = NewsQuery(query_text=q)
        session.add(new_query)

    session.commit()


if __name__ == "__main__":
    create_tables()
