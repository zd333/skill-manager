FROM node:7.7.2
RUN mkdir /spa-dist
WORKDIR /spa-dist
RUN npm install -g @angular/cli@1.0.0-rc.2
COPY . /spa-dist
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]
