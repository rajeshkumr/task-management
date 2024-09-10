# /backend/Dockerfile
# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port 3001 (or whatever your NestJS app is using)
EXPOSE 3001

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
