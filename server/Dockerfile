FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
WORKDIR /app

COPY server/requirements.txt /app
COPY server /app
COPY db /app/db

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 8080

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
