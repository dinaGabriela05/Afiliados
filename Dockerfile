ARG is_dev=true

FROM node:12


WORKDIR /var/www/html/afiliaciones
COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install 

COPY . /var/www/html/afiliaciones

ENV PORT 3005
ENV TZ="America/Guayaquil"

EXPOSE 3005

CMD [ "npm", "run", "start:dev" ]
