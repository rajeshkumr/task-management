# /frontend/Dockerfile
# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
