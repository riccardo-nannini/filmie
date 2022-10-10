FROM node:12

WORKDIR /app

COPY ./package.json .
RUN npm install
RUN npm i sqlite-async@1.1.2

COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 8080
CMD [ "npm","start"]