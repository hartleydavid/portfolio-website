#Use Node.js as the base image
FROM node:18

#Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose port 5000 (or the port your backend uses)
EXPOSE 5000

# Run the server
CMD ["npm", "start"]
