#!/bin/bash

# Get the root directory of the git repository
root_dir=$(git rev-parse --show-toplevel)

# Navigate to the directory of your Dockerfile for db service
cd "$root_dir/db"
docker build -t db:latest .

# Navigate to the directory of your Dockerfile for cron_jobs service
cd "$root_dir/cron_jobs"
docker build -t cron_jobs .

# Navigate to the directory of your docker-compose.yml file
cd "$root_dir"