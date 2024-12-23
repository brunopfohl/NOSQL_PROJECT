db = db.getSiblingDB('knowledgedb')

db.createCollection("topics", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "description"],
         properties: {
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            description: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            connections: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["relatedTopicId", "relationship"],
                  properties: {
                     relatedTopicId: {
                        bsonType: "objectId"
                     },
                     relationship: {
                        bsonType: "string"
                     }
                  }
               }
            }
         }
      }
   }
})

db.createCollection("resources", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["topicId", "title", "type", "dateRead", "content"],
         properties: {
            topicId: {
               bsonType: "objectId"
            },
            title: {
               bsonType: "string"
            },
            type: {
               enum: ["Book", "Article", "Video", "Other"]
            },
            dateRead: {
               bsonType: "date"
            },
            content: {
               bsonType: "string"
            },
            tags: {
               bsonType: "array",
               items: {
                  bsonType: "string"
               }
            }
         }
      }
   }
})

db.createCollection("aiinsights", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["resourceId"],
         properties: {
            resourceId: {
               bsonType: "objectId"
            },
            prompts: {
               bsonType: "array",
               items: {
                  bsonType: "string"
               }
            },
            insights: {
               bsonType: "array",
               items: {
                  bsonType: "string"
               }
            },
            notes: {
               bsonType: "string"
            }
         }
      }
   }
})

db.topics.createIndex({ "name": 1 }, { unique: true })
db.resources.createIndex({ "topicId": 1 })
db.resources.createIndex({ "tags": 1 })
db.aiinsights.createIndex({ "resourceId": 1 })

sh.enableSharding("knowledgedb")

sh.shardCollection("knowledgedb.topics", { "name": 1 })
sh.shardCollection("knowledgedb.resources", { "topicId": 1 })
sh.shardCollection("knowledgedb.aiinsights", { "resourceId": 1 })
