# MongoDB Sharded Cluster Project

A Docker-based MongoDB sharded cluster setup with multiple shards, config servers, and routers for high availability and scalability.

## Architecture

- 2 Query Routers (mongos)
- 3 Config Servers (replica set)
- 3 Shards (each with 3 replica set members)
- JupyterLab for data analysis

## Prerequisites

- Docker Engine >= 27.4.0
- Docker Compose >= v2.31.0-desktop.2

## Quick Start

1. Create authentication key:
```bash
mkdir -p auth
openssl rand -base64 756 > auth/keyfile
chmod 400 auth/keyfile
```

2. Start the cluster:
```bash
docker-compose up -d
```

3. Wait for initialization (approximately 2-3 minutes)

4. Verify cluster status:
```bash
docker exec -it router-01 mongosh --eval "sh.status()"
```

## Connection Details

- Main Router: `mongodb://admin:admin@localhost:27017`
- Backup Router: `mongodb://admin:admin@localhost:27018`
- JupyterLab: `http://localhost:8888` (password: easy)

## Available Collections

The cluster comes preconfigured with three sharded collections in the `businessdb` database:
- organizations
- people
- customers

## Example Usage

1. Connect to the cluster:
```bash
docker exec -it router-01 mongosh "mongodb://admin:admin@localhost:27017/businessdb"
```

2. Insert test data:
```javascript
db.organizations.insertOne({
    organizationId: "org1",
    name: "Test Company",
    industry: "Technology"
})
```

3. Query across shards:
```javascript
db.organizations.find().explain("executionStats")
```

## Monitoring

Check replica set status:
```bash
# Config servers
docker exec -it cfg-node-a mongosh --eval "rs.status()"

# Shard 1
docker exec -it shard-01-node-a mongosh --eval "rs.status()"
```

## Shutdown

Stop the cluster:
```bash
docker-compose down
```

Remove all data:
```bash
docker-compose down -v
```

## Project Structure

```
.
├── auth/               # Authentication keys
├── scripts/           # MongoDB initialization scripts
├── data/             # Shared data volume for Jupyter
├── docker-compose.yml # Container orchestration
├── Dockerfile        # MongoDB container definition
└── README.md
```

## Troubleshooting

1. If initialization fails, check logs:
```bash
docker-compose logs router1
```

2. Restart specific component:
```bash
docker-compose restart router1
```

3. Reset entire cluster:
```bash
docker-compose down -v
docker-compose up -d
```
