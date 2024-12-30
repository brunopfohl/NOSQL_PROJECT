# MongoDB Sharded Cluster Examples

This directory contains Jupyter notebooks demonstrating various aspects of MongoDB sharded cluster operations.

## Notebooks:

1. **Basic Operations** (1_basic_operations.ipynb)
   - CRUD operations in sharded environment
   - Data validation
   - Batch operations

2. **Advanced Aggregation** (2_aggregation.ipynb)
   - Complex pipelines
   - Group operations
   - Statistical analysis

3. **Cluster Management** (3_cluster_management.ipynb)
   - Shard analysis
   - Node failure handling
   - Recovery procedures

4. **Complex Queries** (4_complex_queries.ipynb)
   - Multi-collection operations
   - Advanced search capabilities
   - Pattern matching

5. **Performance Analytics** (5_performance_analytics.ipynb)
   - Query optimization
   - Resource monitoring
   - Bottleneck analysis

## Usage:

1. Start the MongoDB cluster:
```bash
docker-compose up -d
```

2. Access JupyterLab:
```
http://localhost:8888
Token: easy
```

3. Run notebooks in order (1-5)
