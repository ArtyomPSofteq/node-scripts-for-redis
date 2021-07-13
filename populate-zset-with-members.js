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
const timeLabel = `Time for adding ${membersCount} members to ZSet (${keyName})`;

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  const members = [];
  for (let i = 0; i < membersCount; i++) {
    const memberName = `${memberNameStartWith}${Math.random()}`;
    const scoreValue = random(minScoreValue, maxScoreValue);
    members.push(scoreValue, memberName);
  }
  client.zadd(keyName, members, (error, response) => {
    if (error) throw error;
    console.timeEnd(timeLabel);
    process.exit();
  });
});

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
