const redis = require("redis");
const { DB_CONFIG } = require('./config');
const client = redis.createClient(DB_CONFIG);

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB');
  client.flushall((error) => {
    if (error) throw error;
    console.log('All keys have been removed from the databases');
  } )
});
