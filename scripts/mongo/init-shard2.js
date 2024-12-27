let attempt = 0;
const maxAttempts = 30;
const waitMs = 2000;

while (attempt < maxAttempts) {
    try {
        rs.initiate({
            _id: "shard2rs",
            members: [
                { _id: 0, host: "shard2-1:27017", priority: 2 },
                { _id: 1, host: "shard2-2:27017", priority: 1 },
                { _id: 2, host: "shard2-3:c27017", priority: 1 }
            ]
        });
        print("Shard 2 replica set initialized successfully");
        break;
    } catch (err) {
        attempt++;
        if (attempt >= maxAttempts) {
            print("Failed to initialize shard2 replica set after " + maxAttempts + " attempts");
            throw err;
        }
        print("Attempt " + attempt + " failed, retrying in " + waitMs + "ms");
        sleep(waitMs);
    }
}
