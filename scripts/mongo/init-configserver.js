try {
    rs.initiate({
        _id: "cfgrs",
        configsvr: true,
        members: [
            { _id : 0, host : "cfgsvr1:27019", "priority": 1 },
            { _id : 1, host : "cfgsvr2:27019", "priority": 0.5 },
            { _id : 2, host : "cfgsvr3:27019", "priority": 0.5 }
        ]
    },
    {
        force: true,
        timeout: 30000
    })
} catch (e) {
    print("Error during config server initialization: " + e);
    sleep(5000);
    rs.initiate();
}
