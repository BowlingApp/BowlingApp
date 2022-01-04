# syntax=docker/dockerfile:1

FROM node:latest
ENV NODE_ENV=development

WORKDIR /app
COPY ./package.json .
RUN npm install
ENV PATH="/app/etc/node_modules/.bin:${PATH}"

WORKDIR /app/opt
ARG UID=1000
ARG GID=1000
USER ${UID}:${GID}
VOLUME /app/opt

ENTRYPOINT [ "npm" ]
CMD [ "run", "build" ]
