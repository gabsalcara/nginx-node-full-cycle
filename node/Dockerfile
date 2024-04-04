FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install mysql

COPY . .

CMD ["node", "index.js"]