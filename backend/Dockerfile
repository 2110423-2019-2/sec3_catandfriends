FROM node:12

ADD . /backend

RUN cd /backend; npm install --production

ENV NODE_ENV production

EXPOSE 8000

CMD ["node","/backend/server.js"]