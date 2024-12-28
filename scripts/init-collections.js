db = db.getSiblingDB('businessdb')

// Organizations collection
db.createCollection("organizations", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["organizationId", "name", "industry"],
         properties: {
            organizationId: { bsonType: "string" },
            name: { bsonType: "string" },
            website: { bsonType: "string" },
            country: { bsonType: "string" },
            description: { bsonType: "string" },
            founded: { bsonType: "int" },
            industry: { bsonType: "string" },
            numberOfEmployees: { bsonType: "int" }
         }
      }
   }
})

// People collection
db.createCollection("people", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["userId", "firstName", "lastName", "email"],
         properties: {
            userId: { bsonType: "string" },
            firstName: { bsonType: "string" },
            lastName: { bsonType: "string" },
            sex: { bsonType: "string" },
            email: { bsonType: "string" },
            phone: { bsonType: "string" },
            dateOfBirth: { bsonType: "date" },
            jobTitle: { bsonType: "string" }
         }
      }
   }
})

// Customers collection
db.createCollection("customers", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["customerId", "firstName", "lastName", "email"],
         properties: {
            customerId: { bsonType: "string" },
            firstName: { bsonType: "string" },
            lastName: { bsonType: "string" },
            company: { bsonType: "string" },
            city: { bsonType: "string" },
            country: { bsonType: "string" },
            phone1: { bsonType: "string" },
            phone2: { bsonType: "string" },
            email: { bsonType: "string" },
            subscriptionDate: { bsonType: "date" },
            website: { bsonType: "string" }
         }
      }
   }
})

// Create indexes for sharding
db.organizations.createIndex({ "industry": 1, "country": 1 })
db.people.createIndex({ "jobTitle": 1, "dateOfBirth": 1 })
db.customers.createIndex({ "country": 1, "subscriptionDate": 1 })

// Enable sharding for the database
sh.enableSharding("businessdb")

// Configure sharding for collections
sh.shardCollection("businessdb.organizations", { "industry": 1, "country": 1 })
sh.shardCollection("businessdb.people", { "jobTitle": 1, "dateOfBirth": 1 })
sh.shardCollection("businessdb.customers", { "country": 1, "subscriptionDate": 1 })