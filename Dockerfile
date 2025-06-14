FROM node:22
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4100
CMD [ "node", "dist/main.js" ]