# Use the official Node.js image as the base image
FROM node:20.10.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
ARG ENV

ENV ENV=$ENV

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Nuxt.js application
# RUN npm run build
RUN npm run build

# Expose the port that Nuxt.js will run on
EXPOSE 3001

# Command to start the application
CMD ["npm", "start"]