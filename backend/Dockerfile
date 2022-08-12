FROM node:lts-alpine

WORKDIR /bin
COPY package*.json ./
RUN npm install

COPY . .
CMD [ "npm", "start" ]