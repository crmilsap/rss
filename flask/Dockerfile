FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
WORKDIR /app

COPY flask/requirements.txt /app
COPY flask /app
COPY db /app/db

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
