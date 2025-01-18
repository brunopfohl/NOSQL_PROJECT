# MongoDB Sharded Cluster Analysis Project

This project demonstrates MongoDB operations and analysis using a sharded cluster infrastructure.

## Infrastructure Setup

### Docker Compose Configuration
The MongoDB cluster is deployed using Docker Compose with the following components:

- **Config Servers** (3 nodes)
  - config1:27017
  - config2:27017 
  - config3:27017

- **Shard 1** (3 nodes)
  - shard1-1:27017 (primary)
  - shard1-2:27017
  - shard1-3:27017

- **Shard 2** (3 nodes)
  - shard2-1:27017 (primary)
  - shard2-2:27017
  - shard2-3:27017

- **Shard 3** (3 nodes)
  - shard3-1:27017 (primary)
  - shard3-2:27017
  - shard3-3:27017

- **Router** (mongos)
  - router1:27017

## Analysis Notebooks

### 1. Basic Operations (`1_basic_operations.ipynb`)
- Create, Read, Update, Delete (CRUD) operations
- Document counting and distinct value queries
- Basic collection management
- Simple data manipulation examples

### 2. Filtering Records (`2_filtering_records.ipynb`)
- Simple filters:
  - Country-based filtering
  - Industry-based filtering
- Complex filters:
  - Multiple field criteria
  - Nested conditions with OR logic
  - Pattern matching using regex
  - Array filtering with $elemMatch

### 3. Aggregation Operations (`3_aggregation.ipynb`)
- Basic company statistics
- Company age analysis
- Industry performance analysis
- Customer subscription trends
- Employee age distribution
- Temporal market analysis

### 4. Cluster Management (`4_cluster_management.ipynb`)
- Server status monitoring
- Build and host information
- Database and collection listing
- Shard management
- Chunk distribution analysis
- Balancer settings
- Schema validation rules

### 5. Data Transformations (`5_data_transformations.ipynb`)
- Field derivation and computed fields
- Data normalization techniques
- Data enrichment with lookups
- Historical snapshots creation

### 6. Failover Testing (`6_failover.ipynb`)
- Shard primary monitoring
- Failover simulation
- Continuous operation testing
- Cluster resilience verification

## Quick Start

1. Start the MongoDB cluster:
```bash
docker-compose up -d
```

2. Access Jupyter Lab interface:
- Open http://localhost:8888 in your browser
- Password: `easy`
- Execute notebook load_data.ipynb first (data import), then you can execute the rest in any order

## Connection Details
- MongoDB URI: `mongodb://admin:admin@router1:27017/businessdb?authSource=admin`

## Notes
- Sample data is automatically loaded during cluster startup
- All required Python packages are pre-installed in the Jupyter container