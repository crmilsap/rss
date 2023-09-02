# Use an official Node runtime as base image
FROM node:14

# Set working directory
WORKDIR /usr/app

# Copy package.json and yarn.lock files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the current directory contents into the container
COPY . .

# Expose any ports the app is listening on
EXPOSE 19000
EXPOSE 19001

# Start the app
CMD ["yarn", "start"]
