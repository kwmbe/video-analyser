FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm i
RUN npm i -g serve
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "dist"]
