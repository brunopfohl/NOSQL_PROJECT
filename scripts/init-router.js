let attempt = 0;
const maxAttempts = 30;
const waitMs = 5000;

while (attempt < maxAttempts) {
    try {
        print('Initiating router configuration...');
        
        // Wait for shards to be available
        sleep(10000);
        
        sh.addShard("shard1rs/shard1-1:27017,shard1-2:27017,shard1-3:27017");
        sh.addShard("shard2rs/shard2-1:27017,shard2-2:27017,shard2-3:27017");
        sh.addShard("shard3rs/shard3-1:27017,shard3-2:27017,shard3-3:27017");
        
        print('Successfully added all shards');
        
        // Enable sharding for a database (optional)
        // sh.enableSharding("mydb");
        
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
