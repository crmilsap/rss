#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

echo "Debug: DB_HOST=${DB_HOST}"
echo "Debug: DB_PORT=${DB_PORT}"
echo "Debug: POSTGRES_USER=${POSTGRES_USER}"
echo "Debug: POSTGRES_PASSWORD=****"  # Masking the password for security
echo "Debug: POSTGRES_DB=${POSTGRES_DB}"


until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Sleeping - postgres unavailable"
  sleep 5
done

>&2 echo "Container Launching"
exec $cmd