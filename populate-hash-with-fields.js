const redis = require("redis");
const { DB_CONFIG, POPULATE_HASH_WITH_FIELDS_CONFIG } = require('./config');
const {
  keyName,
  fieldStartWith,
  fieldValueStartWith,
  fieldsCount,
} = POPULATE_HASH_WITH_FIELDS_CONFIG;

const client = redis.createClient(DB_CONFIG);

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB');
  for (let i = 0; i < fieldsCount; i++) {
    const randomNumber = Math.random()
    const field = `${fieldStartWith}${randomNumber}`;
    const fieldValue = `${fieldValueStartWith}${randomNumber}`;
    client.hset([keyName, field, fieldValue], (error, response) => {
      if (error) throw error;
      console.log(`Added ${field} field to ${keyName} hash`);
    } )
  }
});

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
