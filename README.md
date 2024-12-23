# MongoDB Sharded Cluster with Docker Compose

This project sets up a MongoDB sharded cluster using Docker Compose, consisting of:
- 1 Router (mongos)
- 3 Config Servers
- 2 Shards (each with 3 replica set members)

## Prerequisites

- Docker
- Docker Compose
- Basic understanding of MongoDB sharding

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

3. Start the cluster:
```bash
docker-compose up -d
```

## Architecture

- Router: localhost:27017
- Config Servers: cfgsvr1:27017, cfgsvr2:27017, cfgsvr3:27017
- Shard 1: shard1-1:27017, shard1-2:27017, shard1-3:27017
- Shard 2: shard2-1:27017, shard2-2:27017, shard2-3:27017

## Connecting to the Cluster

Connect through the router:
```
mongodb://myuser:mypassword@localhost:27017
```

## Verify Cluster Status

```bash
# Check config server replica set
docker exec -it cfgsvr1 mongosh --eval "rs.status()"

# Check shard1 replica set
docker exec -it shard1-1 mongosh --eval "rs.status()"

# Check shard2 replica set
docker exec -it shard2-1 mongosh --eval "rs.status()"

# Check cluster status
docker exec -it mongos mongosh --eval "sh.status()"
```

## Stopping the Cluster

```bash
docker-compose down
```

To remove all data volumes:
```bash
docker-compose down -v
```

# Personal Knowledge Graph MVP

A MongoDB-based system for tracking learning topics, resources, and AI-generated insights.

## System Architecture

The system consists of three main collections:

1. **Topics**: Subject areas you're learning about
2. **Resources**: Learning materials linked to topics
3. **AIInsights**: AI-generated content about resources

## Prerequisites

- Node.js 18+
- MongoDB 7.0+
- TypeScript

## Setup

1. Install dependencies:
```bash
npm install mongoose dotenv typescript @types/node @types/mongoose
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

## Data Structure

### Topics Collection
```typescript
{
  name: string,          // e.g., "Machine Learning"
  description: string,   // Brief overview
  connections: [{        // Links to related topics
    relatedTopicId: ObjectId,
    relationship: string // e.g., "prerequisite", "related"
  }]
}
```

### Resources Collection
```typescript
{
  topicId: ObjectId,    // Reference to Topic
  title: string,        // e.g., "Introduction to ML"
  type: enum,           // Book, Article, Video
  dateRead: Date,       // Consumption date
  content: string,      // Summary/notes
  tags: string[]        // Search keywords
}
```

### AIInsights Collection
```typescript
{
  resourceId: ObjectId, // Reference to Resource
  prompts: string[],    // AI-generated questions
  insights: string[],   // AI-generated summaries
  notes: string        // Personal reflections
}
```

## Usage Examples

### Adding a New Topic
```typescript
const topic = await Topic.create({
  name: "Machine Learning",
  description: "Study of algorithms that improve through experience",
  connections: []
});
```

### Adding a Resource
```typescript
const resource = await Resource.create({
  topicId: topic._id,
  title: "Machine Learning Basics",
  type: ResourceType.BOOK,
  dateRead: new Date(),
  content: "Comprehensive introduction to ML concepts...",
  tags: ["ML", "AI", "basics"]
});
```

### Adding AI Insights
```typescript
const insight = await AIInsight.create({
  resourceId: resource._id,
  prompts: ["Explain supervised learning"],
  insights: ["Supervised learning is..."],
  notes: "Need to review classification algorithms"
});
```

## Data Relationships

- Each Resource must be linked to one Topic
- Topics can have many Resources
- Each AIInsight is linked to one Resource
- Resources can have multiple AIInsights
- Topics can be connected to multiple other Topics

## Tips

1. Start with creating Topics first
2. Add Resources as you consume content
3. Generate AIInsights after adding Resources
4. Use meaningful tags for better searchability
5. Keep descriptions and notes concise but informative
