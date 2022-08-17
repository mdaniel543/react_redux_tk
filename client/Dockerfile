### STAGE 1: Build ###
FROM node:18 AS node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/ /usr/share/nginx/html