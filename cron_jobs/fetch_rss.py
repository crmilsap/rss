from datetime import datetime
import logging
import time
import feedparser
from db.orm import DatabaseConfig, RSSFeedEntry, RssQuery
from sqlalchemy.exc import IntegrityError


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
)
def fetch_rss_feeds():
    session = DatabaseConfig().get_session()
    
    # Fetch all queries from the database
    queries = session.query(RssQuery).all()
    
    for query_obj in queries:
        query_text = query_obj.query_text
        query_id = query_obj.id

        rss_url = f'https://news.google.com/rss/search?q={query_text.replace(" ", "+")}'
        feed = feedparser.parse(rss_url)
        

        logging.info(f"Fetching entries for query: {query_text}")
        for entry in feed.entries:
            try:
                pub_date = datetime.fromtimestamp(time.mktime(entry.published_parsed))
                
                rss_entry = RSSFeedEntry(
                    query_id=query_id,
                    title=entry.title,
                    link=entry.link,
                    description=entry.description,
                    pub_date=pub_date
                )
                session.add(rss_entry)
                session.commit()
                logging.info(f"Saved entry: {entry.title} ({entry.link})")
            except IntegrityError:
                session.rollback()
                logging.info(f"Duplicate entry found, skipping: {entry.link}")


if __name__ == "__main__":
    fetch_rss_feeds()
    logging.info("Execution completed.")