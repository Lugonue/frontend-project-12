FROM node:19-slim
WORKDIR /app
COPY ./docker-entrypoint.sh ./
COPY package*.json ./
COPY ./frontend ./frontend
RUN npm ci --omit-dev
EXPOSE 3000
ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
