# --- Build Stage ---
# Use a Node.js image to build the static files
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# IMPORTANT: Set the API URL for the production build
# We will point this to the internal Kubernetes service name for the backend
ARG VITE_API_BASE_URL=http://portfolio-api-service:8080/api/v1
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the production-ready static files
RUN npm run build

# --- Serve Stage ---
# Use a lightweight Nginx web server to serve the static files
FROM nginx:stable-alpine

# Copy the built static files from the 'builder' stage into Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx config to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80