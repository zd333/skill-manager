FROM node:argon
RUN mkdir /backend-dist
COPY . /backend-dist
WORKDIR /backend-dist
RUN npm install
EXPOSE 3042
CMD ["npm", "start"]
