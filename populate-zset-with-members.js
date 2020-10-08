const redis = require("redis");
const { DB_CONFIG, POPULATE_ZSET_WITH_MEMBERS_CONFIG } = require('./config');
const {
  memberNameStartWith,
  membersCount,
  maxScoreValue,
  minScoreValue,
  keyName
} = POPULATE_ZSET_WITH_MEMBERS_CONFIG;

const client = redis.createClient(DB_CONFIG);

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB');
  for (let i = 0; i < membersCount; i++) {
    const memberName = `${memberNameStartWith}${Math.random()}`
    const scoreValue = random(minScoreValue, maxScoreValue)
    client.zadd([keyName, scoreValue, memberName], (error, response) => {
      if (error) throw error;
      console.log(`Added ${memberName} member to ${keyName} zset`);
    } )
  }
});

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
