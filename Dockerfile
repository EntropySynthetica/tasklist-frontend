FROM node:16.10.0-alpine3.14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ /app

CMD ["npm", "run", "start"]