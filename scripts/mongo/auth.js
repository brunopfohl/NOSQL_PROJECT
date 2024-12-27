let attempts = 0;
const maxAttempts = 30;
const waitMs = 2000;

while (attempts < maxAttempts) {
    try {
        // Check if we're on primary
        const isMaster = db.isMaster();
        if (!isMaster.ismaster) {
            print("Not on primary, waiting...");
            sleep(waitMs);
            attempts++;
            continue;
        }

        db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
        
        db.createUser({ 
            user: process.env.DB_USERNAME,
            pwd: process.env.DB_PASSWORD,
            roles: [{ role: 'root', db: process.env.MONGO_INITDB_DATABASE }] 
        }, { w: 'majority', wtimeout: 5000 });
        
        print("Successfully created user");
        break;
    } catch (err) {
        print("Error creating user: " + err);
        if (attempts >= maxAttempts) {
            throw err;
        }
        attempts++;
        sleep(waitMs);
    }
}