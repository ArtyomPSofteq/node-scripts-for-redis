const redis = require("redis");
const { DB_CONFIG, POPULATE_DB_WITH_SETS_СONFIG } = require('./config');
const { keyNameStartWith, count } = POPULATE_DB_WITH_SETS_СONFIG;
const client = redis.createClient(DB_CONFIG);

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB');
  for (let i = 0; i < count; i++) {
    const keyName = `${keyNameStartWith}${Math.random()}`;
    client.sadd([keyName, 'member'], (error, response) => {
      if (error) throw error;
      console.log(`Added ${keyName} set`);
    } )
  }
});
