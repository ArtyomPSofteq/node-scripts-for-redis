const redis = require("redis");
const { DB_CONFIG } = require('./config');
const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for delete all keys`;

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  client.flushall((error) => {
    if (error) throw error;
    console.timeEnd(timeLabel);
    process.exit();
  } )
});
