FROM mongo:latest
COPY auth/mongodb-keyfile /data/mongodb-keyfile
RUN chmod 400 /data/mongodb-keyfile
RUN chown 999:999 /data/mongodb-keyfile