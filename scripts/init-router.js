print('Initiating router replica set');
sh.addShard("shard1rs/shard1-1:27017,shard1-2:27017,shard1-3:27017")
sh.addShard("shard2rs/shard2-1:27017,shard2-2:27017,shard2-3:27017")
sh.addShard("shard3rs/shard3-1:27017,shard3-2:27017,shard3-3:27017")
