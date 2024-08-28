const redis = require('redis');
const rejson = require('redis-rejson');
const { DB_CONFIG, POPULATE_DB_WITH_HASHES_СONFIG } = require('./config');
const { getRandomInt, getRandomIntInclusive } = require('./utils');
const { keyNameStartWith, count } = POPULATE_DB_WITH_HASHES_СONFIG;
const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding ${count} hashes`;

client.on('error', function (error) {
  console.error(error);
});

client.on('connect', function () {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  for (let i = 0; i < count; i++) {
    const keyName = `${keyNameStartWith}:${i + 1}`;

    //Hashes
    client.hset([`${keyName}`, 'field1', 'Hello', 'flield2', 'value2', 'field3', 'value3'], (error, response) => {
      if (error) throw error;
      // console.timeEnd(timeLabel);
      // process.exit();
    });

    setTimeout(() => {
      process.exit();
    }, 1000);

    // Lists
    // client.lpush([`${keyName}:device`, 'element'], (error, response) => {
    //   if (error) throw error;
    //   // console.timeEnd(timeLabel);
    //   // process.exit();
    // });

    // // Sets
    // client.sadd([`${keyName}:email`, 'member'], (error, response) => {
    //   if (error) throw error;
    //   // console.timeEnd(timeLabel);
    //   // process.exit();
    // });

    // // Strings
    // client.set([`${keyName}:phone`, 'test'], (error, response) => {
    //   if (error) throw error;
    //   // console.timeEnd(timeLabel);
    //   // process.exit();
    // });

    // //ZSET
    // client.zadd([`${keyName}:building`, 1, 'member'], (error, response) => {
    //   if (error) throw error;
    //   // console.timeEnd(timeLabel);
    //   // process.exit();
    // });

    // JSON
    // client.json_set(`${keyName}:book`, '.', '{"test":1234}', (error, response) => {
    //   if (error) throw error;
    //   console.timeEnd(timeLabel);
    //   process.exit();
    // });
  }
});
