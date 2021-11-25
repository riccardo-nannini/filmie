FROM node:12

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

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