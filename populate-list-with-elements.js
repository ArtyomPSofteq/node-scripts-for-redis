const redis = require("redis");
const { DB_CONFIG, POPULATE_LIST_WITH_ELEMENTS_CONFIG } = require('./config');
const {
  keyName,
  elementStartWith,
  elementsCount,
} = POPULATE_LIST_WITH_ELEMENTS_CONFIG;

const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding ${elementsCount} elements to List (${keyName})`;

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  const elements = [];
  for (let i = 0; i < elementsCount; i++) {
    const randomNumber = Math.random();
    const element = `${elementStartWith}${randomNumber}`;
    elements.push(element);
  }

  client.lpush(keyName, elements, (error, response) => {
    if (error) throw error;
    console.timeEnd(timeLabel);
    process.exit();
  });
});
