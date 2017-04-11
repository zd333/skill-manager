FROM node:7.7.2
RUN mkdir /backend-dist
COPY . /backend-dist
WORKDIR /backend-dist
RUN npm install
EXPOSE 3042
CMD ["npm", "start"]
