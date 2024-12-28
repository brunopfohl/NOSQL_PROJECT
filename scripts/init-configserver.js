let attempt = 0;
const maxAttempts = 30;
const waitMs = 5000;

while (attempt < maxAttempts) {
    try {
        print("Attempting to initialize config server replica set... (Attempt " + (attempt + 1) + ")");
        rs.initiate({
            _id: "cfgrs",
            configsvr: true,
            members: [
                { _id : 0, host : "cfgsvr1:27019", priority: 2 },
                { _id : 1, host : "cfgsvr2:27019", priority: 1 },
                { _id : 2, host : "cfgsvr3:27019", priority: 1 }
            ]
        });

        print("Config server replica set initialized successfully");
        
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
            print("Failed to initialize config server replica set after " + maxAttempts + " attempts");
            throw err;
        }
        print("Attempt " + attempt + " failed, retrying in " + waitMs + "ms");
        sleep(waitMs);
    }
}

sleep(5000);
print("Final replica set status:");
rs.status();
