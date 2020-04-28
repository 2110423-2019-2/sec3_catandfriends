FROM node:12

ADD . /frontend

RUN cd /frontend; npm install --production

EXPOSE 3000

CMD ["npm","start","--prefix","/frontend"]