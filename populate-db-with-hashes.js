const redis = require("redis");
const { DB_CONFIG, POPULATE_DB_WITH_HASHES_СONFIG } = require('./config');
const { keyNameStartWith, count } = POPULATE_DB_WITH_HASHES_СONFIG;
const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding ${count} hashes`;

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  for (let i = 0; i < count; i++) {
    const keyName = `${keyNameStartWith}${Math.random()}`
    client.hset([keyName, 'field1', 'Hello'], (error, response) => {
      if (error) throw error;
      console.timeEnd(timeLabel);
      process.exit();
    })
  }
});
