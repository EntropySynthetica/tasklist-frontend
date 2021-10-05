# Stage 1
FROM node:16.10.0-alpine3.14 as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ /app

RUN npm run build

# Stage 2
FROM nginx:1.21.3

WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# Copies static resources from builder stage
COPY --from=builder /app/build .

CMD ["nginx", "-g", "daemon off;"]