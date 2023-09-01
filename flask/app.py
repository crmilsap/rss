import logging
from typing import List
from db.orm import DatabaseConfig, RSSFeedEntry, RssQuery
from flask import Flask

app = Flask(__name__)

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
)

# @app.route('/')
# def hello():
#     print('loading rows')
#     session = DatabaseConfig().get_session()
#     rows = session.query(RSSFeedEntry).join(RssQuery).limit(5).all()
#     print(rows)

@app.route('/')
def hello():
    session = DatabaseConfig().get_session()
    rows = session.query(RSSFeedEntry).limit(50).all()
    app.logger.info(rows)
    
    titles: List[str] = list(map(lambda x: x.title, rows))
    return '\n\n'.join(titles)

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    