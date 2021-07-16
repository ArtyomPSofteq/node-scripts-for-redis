const redis = require("redis");
const { DB_CONFIG, POPULATE_SET_WITH_MEMBERS_CONFIG } = require('./config');
const {
  memberNameStartWith,
  membersCount,
  keyName
} = POPULATE_SET_WITH_MEMBERS_CONFIG;

const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding ${membersCount} members to Set (${keyName})`;

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  const members = [];
  for (let i = 0; i < membersCount; i++) {
    const memberName = `${memberNameStartWith}${Math.random()}`;
    members.push(memberName);
  }
  client.sadd(keyName, members, (error, response) => {
    if (error) throw error;
    console.timeEnd(timeLabel);
    process.exit();
  });
});
