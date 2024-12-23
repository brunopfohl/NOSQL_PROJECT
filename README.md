# MongoDB Replica Set with Docker Compose

This project sets up a MongoDB replica set using Docker Compose, consisting of three MongoDB instances configured for high availability.

## Prerequisites

- Docker
- Docker Compose
- Basic understanding of MongoDB replication

## Setup

1. Create the keyfile for MongoDB authentication:
```bash
mkdir -p scripts/mongo
openssl rand -base64 756 > scripts/mongo/rs_keyfile
chmod 400 scripts/mongo/rs_keyfile
```

2. Set environment variables (optional):
```bash
export MONGO_ADMIN_USER=admin
export MONGO_ADMIN_PASSWD=veryStringPassword
export DB_NAME=test
export DB_USERNAME=myuser
export DB_PASSWORD=mypassword
```

3. Start the replica set:
```bash
docker-compose up -d
```

## Configuration

- Primary Node: localhost:27017
- Secondary Node 1: localhost:27018
- Secondary Node 2: localhost:27019

Default credentials:
- Admin User: admin
- Admin Password: veryStringPassword
- Database User: myuser
- Database Password: mypassword

## Connecting to the Replica Set

Connect using the MongoDB connection string:
```
mongodb://myuser:mypassword@localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0
```

## Health Check

The primary node includes a health check that automatically initializes the replica set. The status can be checked using:
```bash
docker exec mongo_rs0 mongosh --eval "rs.status()"
```

## Stopping the Cluster

```bash
docker-compose down
```

To remove all data volumes:
```bash
docker-compose down -v
```
