# Stage 1: Build stage using Node.js
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy all frontend source files
COPY . .

# Generate the production-ready build files
RUN npm run build

# Stage 2: Serve stage using Nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the build stage to Nginx web directory
# Using /app/dist for Vite (change to /app/build if using Create React App)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]


