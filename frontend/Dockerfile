FROM node:lts-slim as builder

COPY package.json package-lock.json ./
RUN npm install && mkdir /frontend && mv ./node_modules ./frontend

WORKDIR /frontend
COPY . .

RUN npm run build


FROM nginx:1.19.2-alpine
COPY --from=builder /frontend/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80