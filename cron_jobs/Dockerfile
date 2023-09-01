FROM python:3.11

# Install deps
RUN apt-get update && apt-get install -y cron postgresql-client
RUN pip install feedparser sqlalchemy psycopg2
# Copy the script and cron configuration

COPY cron_jobs/fetch_rss.py /cron/fetch_rss.py
COPY cron_jobs/mycron /etc/cron.d/mycron
COPY db /cron/db

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/mycron

# Apply the cron job
RUN crontab /etc/cron.d/mycron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Add the wait script to the image
ADD cron_jobs/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


# Run the command on container startup
CMD printenv > /etc/environment && /entrypoint.sh db && cron && service cron start && tail -f /var/log/cron.log
