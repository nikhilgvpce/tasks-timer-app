FROM node

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

RUN yarn install 

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
