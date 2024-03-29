FROM node:lts-alpine 

WORKDIR /app

COPY . .

RUN npm ci --ommit=dev

RUN npm run build

USER node:node 

CMD ["node", "build/index.js"]

