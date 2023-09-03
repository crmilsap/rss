FROM python:3.11

WORKDIR /cron

COPY cron-jobs/ /cron
COPY cron-jobs/mycron /etc/cron.d/mycron
COPY db /cron/db

RUN apt-get update && apt-get install -y cron postgresql-client
RUN pip install --trusted-host pypi.python.org -r requirements.txt

RUN chmod 0644 /etc/cron.d/mycron

# Apply the cron job
RUN crontab /etc/cron.d/mycron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Add the wait script to the image
ADD cron-jobs/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


# Run the command on container startup
CMD printenv > /etc/environment && /entrypoint.sh db && cron && service cron start && tail -f /var/log/cron.log
