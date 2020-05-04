# The builder from node image
FROM node:12.16.3

WORKDIR /

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

RUN ./node_modules/.bin/sequelize db:migrate && ./node_modules/.bin/sequelize db:seed:all

CMD ["yarn", "start"]
