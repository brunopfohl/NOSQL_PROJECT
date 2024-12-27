db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE)

db.createUser({ 
    user: process.env.DB_USERNAME,
    pwd: process.env.DB_PASSWORD,
    roles: [{ role: 'root', db: process.env.MONGO_INITDB_DATABASE }] 
}, { w: 'majority', wtimeout: 5000 });