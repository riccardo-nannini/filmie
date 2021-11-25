FROM node:12

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 8080
CMD [ "npm","start"]