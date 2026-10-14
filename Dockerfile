# Stage 1: Build the application
FROM node:24-alpine AS build-stage

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_X_API_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_X_API_KEY=$NEXT_PUBLIC_X_API_KEY

# Set working directory
WORKDIR /app

# Install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the app source
COPY . .

# Build the app for production
RUN yarn build

# Stage 2: Serve the app with nginx
FROM nginx:stable-alpine AS production-stage

# Copy built files from previous stage
COPY --from=build-stage /app/out /usr/share/nginx/html

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Optional: Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
