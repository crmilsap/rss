import feedparser


# query 
def rss_query(query: str):
    # Replace with your RSS feed URL
    rss_url = f'https://news.google.com/rss/search?q={query.replace(" ", "+")}'

    feed = feedparser.parse(rss_url)

    print(len(feed))
    for entry in feed.entries:
        print(entry.title)
        print(entry.link)
        print(entry.description)
        print('---')

def main():
    queries = ['financial news us']
    
    for q in queries:
        print(f"Querying: {q}")
        rss_query(q)
        
if __name__ == "__main__":
    main()