FROM postgres:latest

RUN apt-get update && apt-get install -y python3 python3-pip python3-sqlalchemy python3-psycopg2
# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD postgres
# ENV POSTGRES_DB RSS_FEEDS

# Copy the generate_tables.py and entrypoint.sh into the container
COPY generate_tables.py /generate_tables.py
COPY entrypoint.sh /entrypoint.sh

# Make the entry script executable
RUN chmod +x /entrypoint.sh

EXPOSE 5432

# Use the entry script as the entry point
ENTRYPOINT ["/entrypoint.sh"]