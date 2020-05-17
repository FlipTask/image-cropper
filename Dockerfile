ARG PORT
FROM node:10-alpine
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
RUN npm rebuild node-sass
USER node
COPY --chown=node:node . .

RUN npm run build

EXPOSE $PORT
CMD [ "node", "server-build/server.js" ]