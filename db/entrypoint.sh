#!/bin/bash
set -e

# Run the main postgres entrypoint script from the postgres docker image
docker-entrypoint.sh postgres &

# Capture the PID of the background process
POSTGRES_PID=$!

# Wait for Postgres to become available
until pg_isready -h $DB_HOST -U $POSTGRES_USER -p $DB_PORT; do
  echo "DB unavailable - sleeping"
  sleep 1
done

# Run generate_tables.py script
echo "Postgres is up - executing generate_tables.py"
python3 generate_tables.py

# Wait for the original entry point to complete (keep the container running)
wait $POSTGRES_PID
