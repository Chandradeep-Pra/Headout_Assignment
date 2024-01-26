# Use the official Node.js image with a specific version (e.g., 14)
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install express nodemon 

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variables for Node.js
ENV NODE_ENV=production

# Run the application when the container starts
CMD ["node", "index.js"]
