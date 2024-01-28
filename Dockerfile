FROM node:18.16.0

# Setting the working directory in the container
WORKDIR /app

COPY . /app

# Copy package.json and package-lock.json to the working directory
#COPY package*.json ./

# Install dependencies
RUN npm install express
RUN npm i -D nodemon

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variables for Node.js
# ENV NODE_ENV=production
ENV NAME headout-assessment

# Run the application when the container starts
CMD ["node", "start"]
