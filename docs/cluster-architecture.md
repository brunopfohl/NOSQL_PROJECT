# MongoDB Sharded Cluster Architecture

## Overview
This cluster implements a production-grade MongoDB sharded setup with:
- 3 Config Servers (CSRS)
- 2 Shards (each with 3-node replica set)
- 1 Router (mongos)
- Authentication enabled
- Persistent storage

## Component Details

### Config Servers (cfgsvr1, cfgsvr2, cfgsvr3)
- Purpose: Store metadata and configuration
- Replica Set Name: cfgrs
- Port: 27017
- Features:
  - Keyfile authentication
  - Persistent volumes
  - Root user credentials

### Shard 1 (shard1-1, shard1-2, shard1-3)
- Purpose: First data shard
- Replica Set Name: shard1rs
- Features:
  - Keyfile authentication
  - Custom initialization script
  - Dedicated volumes

### Shard 2 (shard2-1, shard2-2, shard2-3)
- Purpose: Second data shard
- Replica Set Name: shard2rs
- Features:
  - Identical configuration to Shard 1
  - Independent replica set

### Router (mongos)
- Purpose: Query router
- Port: 27017 (exposed)
- Features:
  - Connects to config servers
  - Routes client requests
  - Load balancing

## Security Features
- Keyfile authentication (/etc/mongodb/pki/keyfile)
- Root user credentials via environment variables
- Internal network isolation
- Bind IP restrictions

## Storage
- Persistent volumes for each node
- Docker named volumes
- Initialization scripts mounted

## Networking
- Custom bridge network (mongo-cluster)
- Internal DNS resolution
- Port mapping for external access
