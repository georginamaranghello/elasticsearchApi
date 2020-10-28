FROM node:alpine3.10
RUN mkdir /app
RUN addgroup appuser && adduser appuser --ingroup appuser --gecos "User to run app" --disabled-password
RUN chown appuser:appuser /app
USER appuser
COPY package.json /app/
ADD server /app/server
WORKDIR /app
RUN npm install
CMD npm start