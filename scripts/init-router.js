let attempt = 0;
const maxAttempts = 30;
const waitMs = 5000;
const DB_USERNAME = "admin";
const DB_PASSWORD = "admin";

while (attempt < maxAttempts) {
    try {
        print('Initiating router configuration...');
        
        // Authenticate as admin
        db.getSiblingDB("admin").auth(DB_USERNAME, DB_PASSWORD);
        
        // Wait for shards to be available
        sleep(10000);
        
        // Add shards with verification
        print('Adding shards...');
        sh.addShard("shard1rs/shard1-1:27017,shard1-2:27017,shard1-3:27017");
        sh.addShard("shard2rs/shard2-1:27017,shard2-2:27017,shard2-3:27017");
        sh.addShard("shard3rs/shard3-1:27017,shard3-2:27017,shard3-3:27017");
        
        // Verify shards are added
        let shards = db.adminCommand({ listShards: 1 });
        if (!shards.ok || shards.shards.length < 3) {
            throw new Error("Not all shards are available yet");
        }
        
        print('Successfully added all shards');
        
        // Wait for shards to be fully available
        sleep(5000);
        
        // Initialize collections and sharding
        print('Initializing collections and configuring sharding...');
        load("/data/scripts/init-collections.js");
        
        // Wait for sharding to be configured
        sleep(5000);
        
        break;
    } catch (err) {
        attempt++;
        print("Error: " + err);
        if (attempt >= maxAttempts) {
            print("Failed to initialize router after " + maxAttempts + " attempts");
            throw err;
        }
        print("Attempt " + attempt + " failed, retrying in " + waitMs + "ms");
        sleep(waitMs);
    }
}

// Final verification
try {
    let status = sh.status();
    print("\nFinal sharding status:");
    printjson(status);
} catch (err) {
    print("Error getting final status: " + err);
}
