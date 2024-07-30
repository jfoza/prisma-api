FROM node:lts-alpine

ENV TZ=America/Sao_Paulo

USER root

WORKDIR /var/www/html

RUN npm install -g pnpm @nestjs/cli && \
    pnpm config set registry https://registry.npmjs.org/ && \
    pnpm config set fetch-retries 5 && \
    pnpm config set fetch-retry-mintimeout 30000 && \
    pnpm config set fetch-retry-maxtimeout 60000

COPY ./ ./

RUN pnpm install

RUN chown -R root:root /var/www/html && chmod -R 775 /var/www/html

CMD sh -c "while true; do sleep 100; done"
