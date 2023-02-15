const redis = require('redis');
const { DB_CONFIG, POPULATE_HASH_WITH_FIELDS_CONFIG } = require('./config');
const { keyName, fieldStartWith, fieldValueStartWith, fieldsCount } =
  POPULATE_HASH_WITH_FIELDS_CONFIG;

const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding ${fieldsCount} fields to Hash (${keyName})`;

client.on('error', function (error) {
  console.error(error);
});

client.on('connect', function () {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  const fields = [];
  for (let i = 0; i < fieldsCount; i++) {
    const randomNumber = Array.from({ length: 5 }).fill(Math.random());
    const field = `${fieldStartWith}${randomNumber.toString()}`;
    const fieldValue = `${fieldValueStartWith}${randomNumber}`;
    fields.push(field, fieldValue);
  }

  client.hset(keyName, fields, (error, response) => {
    if (error) throw error;
    console.timeEnd(timeLabel);
    process.exit();
  });
});
