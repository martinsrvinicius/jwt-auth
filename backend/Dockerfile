# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 5000

# Command to run the app
CMD ["npm", "run", "dev"]
