const redis = require('redis');
const { DB_CONFIG, POPULATE_DB_WITH_LISTS_СONFIG } = require('./config');
const { keyNameStartWith, count } = POPULATE_DB_WITH_LISTS_СONFIG;
const client = redis.createClient(DB_CONFIG);

const timeLabel = `Time for adding ${count} lists`;
client.on('error', function (error) {
  console.error(error);
});

client.on('connect', async function () {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  for (let i = 0; i < count; i++) {
    const keyName = `user:${i + 1}`;
    await client.lpush([keyName, `${'element123' + Math.random()}`], (error, response) => {
      if (error) throw error;
    });
  }
  // console.timeEnd(timeLabel);
  // process.exit();
});
