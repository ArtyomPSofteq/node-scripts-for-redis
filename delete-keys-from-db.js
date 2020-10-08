const redis = require("redis");
const { DB_CONFIG, DELETE_KEYS_FROM_DB_CONFIG } = require('./config');
const { matchPattern } = DELETE_KEYS_FROM_DB_CONFIG
const client = redis.createClient(DB_CONFIG);

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB');
  client.dbsize((error, dbsize) => {
    if (error) throw error;
    client.scan([0, 'COUNT', dbsize, 'MATCH', matchPattern], (error, [cursor, keys]) => {
      if (error) throw error;
      keys.forEach(keyName => {
        client.del(keyName, (error) => {
          if (error) throw error;
          console.log(`Deleted ${keyName}`);
        })
      })
    })
  })
});
