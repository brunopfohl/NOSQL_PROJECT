rs.initiate({
    _id: "shard1rs",
    members: [
        { _id: 0, host: "shard1-1:27018" },
        { _id: 1, host: "shard1-2:27018" },
        { _id: 2, host: "shard1-3:27018" }
    ]
})
