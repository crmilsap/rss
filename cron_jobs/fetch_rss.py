import logging
import os
import feedparser
from db.generate_tables import DatabaseConfig, RSSFeedEntry


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
)

# query 
def rss_query(query: str):
    # Replace with your RSS feed URL
    rss_url = f'https://news.google.com/rss/search?q={query.replace(" ", "+")}'

    feed = feedparser.parse(rss_url)

    logging.info(os.environ)
    session = DatabaseConfig().get_session()
    logging.info(f"Saving {len(feed)} entries")
    for entry in feed.entries:
        rss_entry = RSSFeedEntry(
            title=entry.title,
            link=entry.link,
            description=entry.description
        )
        session.add(rss_entry)
        session.commit()

    session.close()

def main():
    queries = ['financial news us']
    
    for q in queries:
        logging.info(f"Querying: {q}")
        try:
            rss_query(q)
        except Exception as e:
            logging.error(f"Error occurred while querying: {q}")
            logging.exception(e)
            raise
        
        
if __name__ == "__main__":
    main()
    logging.info("Execution completed.")