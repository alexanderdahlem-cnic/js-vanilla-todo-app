FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy code and build
COPY . .
RUN npm run build

# Install minimal webserver
RUN npm install -g http-server

# Start webserver on port 8080 serving ./public
CMD ["http-server", "public", "-p", "8080", "-c-1"]
