print("\n=== Starting database initialization ===")
db = db.getSiblingDB('businessdb')
print("Connected to businessdb")

try {
    // Organizations collection
    print("\nCreating organizations collection...")
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
    print("Organizations collection created successfully")

    // People collection
    print("\nCreating people collection...")
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
    print("People collection created successfully")

    // Customers collection
    print("\nCreating customers collection...")
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
    print("Customers collection created successfully")

    sh.enableSharding("businessdb")
    db.adminCommand( { shardCollection: "businessdb.organizations", key: { industry: "hashed" }, numInitialChunks: 3 } )
    db.adminCommand( { shardCollection: "businessdb.people", key: { userId: "hashed" }, numInitialChunks: 3 } )
    db.adminCommand( { shardCollection: "businessdb.customers", key: { customerId: "hashed" }, numInitialChunks: 3 } )

    print("\nConfiguring and starting balancer...")
    
    // Enable and start balancer
    sh.setBalancerState(true)
    sh.startBalancer()

    // Wait for balancer to start
    sleep(5000)

    // Verify balancer is running
    let balancerStatus = sh.getBalancerState()
    let isBalancerRunning = sh.isBalancerRunning()
    
    print(`Balancer enabled: ${balancerStatus}`)
    print(`Balancer running: ${isBalancerRunning}`)

    if (!balancerStatus || !isBalancerRunning) {
        throw new Error("Balancer is not running properly")
    }

    // Force a balancer round
    print("\nTriggering balancer round...")
    sh.forceBalancerRound()

    print("Balancer configuration complete")
    
    // Show current balancer status
    print("\nFinal balancer status:")
    printjson(sh.getBalancerState())
    printjson(sh.isBalancerRunning())

    // After all collections
    print("\nCollection creation complete")
    print("\nCurrent collections in database:")
    db.getCollectionNames().forEach(function(collection) {
        print(" - " + collection)
    })

} catch (error) {
    print("\nERROR during initialization:")
    print(error)
    throw error
}

print("\n=== Database initialization finished ===")