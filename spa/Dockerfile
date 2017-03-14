FROM node:7.7.2
ENV HOME=/spa-dist
RUN mkdir $HOME
WORKDIR $HOME
RUN npm install --global angular-cli
COPY . $HOME
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]
