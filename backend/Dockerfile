From node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --save graphql

COPY mongoose-connect.js ./

COPY . ./

EXPOSE 3001

CMD ["npm", "run", "serve"]
