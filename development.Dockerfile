FROM node:20 as Build

USER node

WORKDIR /app

COPY --chown=node:node . /app
RUN chmod -R 755 /app

CMD sh -c "npm install && npm run lint && npm run dev"
