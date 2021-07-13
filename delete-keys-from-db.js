const redis = require("redis");
const { DB_CONFIG, DELETE_KEYS_FROM_DB_CONFIG } = require('./config');
const { matchPattern } = DELETE_KEYS_FROM_DB_CONFIG
const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for delete all keys by pattern '${matchPattern}'`;

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  client.dbsize((error, dbsize) => {
    if (error) throw error;
    client.scan([0, 'COUNT', dbsize, 'MATCH', matchPattern], (error, [cursor, keys]) => {
      if (error) throw error;
      if (keys.length) {
        client.del(keys, (error) => {
          if (error) throw error;
          console.timeEnd(timeLabel);
          process.exit();
        })
      }
      if (!keys.length) {
        console.log('No keys found');
        process.exit();
      }
    })
  })
});
