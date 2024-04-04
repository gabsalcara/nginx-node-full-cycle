FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm install express && npm install mysql

EXPOSE 3000

CMD ["node", "index.js"]