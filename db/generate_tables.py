from typing import Any
from orm import Base, DatabaseConfig, RssQuery

def create_tables():
    db_config = DatabaseConfig()
    Base.metadata.create_all(bind=db_config.get_engine())
    
    session = db_config.get_session()
    
    initial_queries = {'business news', 'stock market', 'technology news', 'real estate', 'crypto news', 'bitcoin news', 'ethereum news',  'artificial intelligence'}
    existing_queries = set(row.query_text for row in session.query(RssQuery).all())
    
    for q in initial_queries - existing_queries:
        new_query = RssQuery(query_text=q)
        session.add(new_query)
                
    session.commit()

if __name__ == "__main__":
    create_tables()

