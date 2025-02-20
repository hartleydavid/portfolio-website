# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all frontend files (excluding node_modules)
COPY . .

# Expose the development server port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
#FROM node:18-alpine
#WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#CMD ["npm", "run", "dev"]
