FROM postgres:latest

RUN apt-get update && apt-get install -y python3 python3-pip python3-sqlalchemy python3-psycopg2

COPY . .

# Make the entry script executable
RUN chmod +x /entrypoint.sh

EXPOSE 5432

# Use the entry script as the entry point
ENTRYPOINT ["/entrypoint.sh"]