# Step 1: Build the app in image 'builder'
FROM node:12.14.1-alpine AS builder

WORKDIR /usr/src/app
COPY angular .
RUN yarn && yarn build

# Step 2: Use build output from 'builder'
FROM nginx:1.17.7-alpine
LABEL version="1.0"

COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/angular/ .
