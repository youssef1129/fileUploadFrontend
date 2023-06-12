FROM node:14-alpine AS builder
ENV NODE_ENV=production

WORKDIR /react/app
COPY package.json .
RUN npm i
COPY . .
ARG REACT_APP_SERVER=http://localhost:4700/
ENV REACT_APP_SERVER=$REACT_APP_SERVER
RUN npm run build

FROM nginx:1.21.0-alpine
ENV NODE_ENV=production
COPY --from=builder /react/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:1.21.0-alpine
# ENV NODE_ENV=production
# # COPY --from=builder /react/app/build /usr/share/nginx/html
# COPY  /build /usr/share/nginx/html
# # COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
