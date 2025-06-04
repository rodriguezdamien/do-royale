FROM node:14.5.0-alpine

ARG BASEDIR
WORKDIR ${BASEDIR}
COPY . .
EXPOSE 5000
ENTRYPOINT [""]
CMD npm install && npm run build && npm run serve

