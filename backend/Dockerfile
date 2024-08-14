FROM node:20-alpine
WORKDIR /server
COPY ./package*.json ./
RUN npm i
COPY ./src ./src
CMD ["npm", "start"]