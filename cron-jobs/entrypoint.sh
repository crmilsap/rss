#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Sleeping - postgres unavailable"
  sleep 5
done

>&2 echo "Container Launching"
exec $cmd