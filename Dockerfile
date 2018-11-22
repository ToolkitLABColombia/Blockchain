FROM node:10
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install && npm install -g swagger
COPY . .
EXPOSE 10443
CMD [ "npm", "start" ]