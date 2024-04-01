FROM node:20-alpine as build 

COPY . /app 

RUN cd /app && npm install --legacy-peer-deps 
RUN cd /app && npm run build 
RUN cd /app && npm prune --production 

FROM node:20-alpine

COPY --from=build /app/build /app/build 
COPY --from=build /app/server.js /app/server.js
COPY --from=build /app/pubsub.js /app/pubsub.js
COPY --from=build /app/gcloud/gcloud-conf.json /gcloud/gcloud-conf.json
COPY --from=build /app/node_modules /app/node_modules 
COPY --from=build /app/package.json /app/package.json

CMD node /app/server.js