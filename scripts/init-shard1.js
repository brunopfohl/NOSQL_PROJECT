let attempt = 0;
const maxAttempts = 50;  // Increased max attempts
const waitMs = 5000;     // Increased wait time

// Initial sleep to ensure MongoDB is ready
sleep(10000);  // Wait 10 seconds before first attempt

while (attempt < maxAttempts) {
    try {
        print("Attempting to initialize replica set... (Attempt " + (attempt + 1) + ")");
        rs.initiate({
            _id: "shard1rs",
            members: [
                { _id: 0, host: "shard1-1:27017", priority: 2 },
                { _id: 1, host: "shard1-2:27017", priority: 1 },
                { _id: 2, host: "shard1-3:27017", priority: 1 }
            ]
        });
        print("Shard 1 replica set initialized successfully");
        break;
    } catch (err) {
        attempt++;
        print("Error: " + err);
        if (attempt >= maxAttempts) {
            print("Failed to initialize shard1 replica set after " + maxAttempts + " attempts");
            throw err;
        }
        print("Attempt " + attempt + " failed, retrying in " + waitMs + "ms");
        sleep(waitMs);
    }
}

// Wait for replica set to stabilize
sleep(5000);
print("Final replica set status:");
rs.status();

