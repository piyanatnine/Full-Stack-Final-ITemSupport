From node:17-alpine

WORKDIR /app

COPY package.json .

COPY mongoose-connect.js .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "serve"]
