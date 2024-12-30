let attempt = 0;
const maxAttempts = 50;
const waitMs = 5000;

sleep(10000);

while (attempt < maxAttempts) {
    try {
        print("Attempting to initialize replica set... (Attempt " + (attempt + 1) + ")");
        rs.initiate({
            _id: "shard2rs",
            members: [
                { _id: 0, host: "shard2-1:27017", priority: 2 },
                { _id: 1, host: "shard2-2:27017", priority: 1 },
                { _id: 2, host: "shard2-3:27017", priority: 1 }
            ]
        });
        print("Shard 2 replica set initialized successfully");

        // Wait for replica set to stabilize
        sleep(5000);
        
        // Load and execute auth script
        print("Loading auth configuration...");
        load("/data/scripts/auth.js");
        break;
    } catch (err) {
        attempt++;
        print("Error: " + err);
        if (attempt >= maxAttempts) {
            print("Failed to initialize shard2 replica set after " + maxAttempts + " attempts");
            throw err;
        }
        print("Attempt " + attempt + " failed, retrying in " + waitMs + "ms");
        sleep(waitMs);
    }
}

sleep(5000);
print("Final replica set status:");
rs.status();
