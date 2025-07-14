FROM node:alpine3.22 AS build
RUN addgroup app && adduser -S -G app app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:mainline-alpine3.22-perl AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]

