FROM node:4.4.0-onbuild

ENV PORT 80
ENV NODE_ENV production
EXPOSE 80

RUN npm run build
