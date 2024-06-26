FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

EXPOSE 3000

COPY . .

CMD ["node", "src/server.js"]
