FROM node:16.13.0-alpine AS development

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000