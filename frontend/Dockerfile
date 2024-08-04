# frontend/Dockerfile
FROM node:20
ENV NODE_OPTIONS="--max-old-space-size=4096"
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
