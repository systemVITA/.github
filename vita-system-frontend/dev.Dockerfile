FROM node:16-alpine

WORKDIR /app

COPY *.json ./
COPY *.js ./
COPY *.ts ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
