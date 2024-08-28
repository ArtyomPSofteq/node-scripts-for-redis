const redis = require('redis');
const { DB_CONFIG, POPU, POPULATE_STREAM_WITH_ENTRIES_CONFIG } = require('./config');
const { keyName, entriesCount, entryStartWith, entryValueStartWith } =
  POPULATE_STREAM_WITH_ENTRIES_CONFIG;

const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding ${entriesCount} fields to Stream (${keyName})`;

const sleep = require('util').promisify(setTimeout);
// const sleep = m => new Promise(r => setTimeout(r, m))

client.on('error', function (error) {
  console.error(error);
});

client.on('connect', async function () {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  const entries = [];
  // for (let i = 0; i < entriesCount; i++) {
  //   const randomNumber = Math.random();
  //   const entry = `${entryStartWith}${randomNumber}`;
  //   const entryValue = `${entryValueStartWith}${randomNumber}`;
  //   entries.push(entry, entryValue);
  // }

  // // client.xadd(keyName, '*', entries, (error, response) => {
  // client.xadd(keyName, '*', 'test', 'test', (error, response) => {
  //   if (error) throw error;
  // });

  (async () => {
    for (let i = 0; i < entriesCount; i++) {
      // console.time('Slept for');

      await client.xadd(keyName, '*', 'test', 'test', (error, response) => {
        if (error) throw error;
      });

      await sleep(10);
      // console.timeEnd('Slept for');
    }

    console.timeEnd(timeLabel);
    process.exit();
  })();
});
