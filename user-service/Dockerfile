FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Exposer le port 4001
EXPOSE 4001

CMD ["node", "index.js"]
