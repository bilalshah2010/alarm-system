# The builder from node image
FROM node:12.16.3

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY login.config.json .

RUN yarn install --pure-lockfile

COPY . .

RUN yarn global add @vue/cli@4.3.1

CMD ["yarn", "serve"]
