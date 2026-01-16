# using node 18 alpine for smaller image size
FROM node:18-alpine

WORKDIR /app

# install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# copy the rest of the backend code
COPY . .

# backend runs on port 5000
EXPOSE 5000

CMD ["npm", "start"]