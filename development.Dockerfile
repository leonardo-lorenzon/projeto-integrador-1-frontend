FROM node:20 as Build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
