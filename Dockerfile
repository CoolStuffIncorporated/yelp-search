# Start with base image
FROM launcher.gcr.io/google/nodejs

# Copy/test changes on package.json
COPY ./package.json /app/

# npm install
RUN cd /app/ && npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)

# Copy/test changes on the remainder of your source code
COPY . /app/

# Used by App Engine to run your app
CMD npm start