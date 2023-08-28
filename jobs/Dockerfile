FROM python:3.11

# Install cron
RUN apt-get update && apt-get install -y cron

# Python Deps
RUN pip install feedparser

# Copy the script and cron configuration
COPY fetch_rss.py /cron/fetch_rss.py
COPY mycron /etc/cron.d/mycron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/mycron

# Apply the cron job
RUN crontab /etc/cron.d/mycron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
