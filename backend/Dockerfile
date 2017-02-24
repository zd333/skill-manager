FROM node:argon
RUN mkdir /app
WORKDIR /app/src
COPY package.json /app
RUN npm install
WORKDIR /app/src
COPY . /app
EXPOSE 3042
CMD ["npm", "start"]
