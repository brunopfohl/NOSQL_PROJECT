FROM mongo:6.0

# Set work directory
WORKDIR /data

# Copy the keyfile into the container
COPY auth/keyfile /data/mongodb-keyfile

# Set permissions and ownership for the keyfile
RUN chmod 600 /data/mongodb-keyfile && \
    chown mongodb:mongodb /data/mongodb-keyfile