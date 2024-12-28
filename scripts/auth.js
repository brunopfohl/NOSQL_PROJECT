const DB_USERNAME = "admin";
const DB_PASSWORD = "admin";
const MONGO_INITDB_DATABASE = "admin";
const maxAttempts = 30;
const waitMs = 2000;
let attempts = 0;

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

        db = db.getSiblingDB(MONGO_INITDB_DATABASE);
        
        db.createUser({ 
            user: DB_USERNAME,
            pwd: DB_PASSWORD,
            roles: [{ role: 'root', db: MONGO_INITDB_DATABASE }] 
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