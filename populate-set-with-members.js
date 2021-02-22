const redis = require("redis");
const { DB_CONFIG, POPULATE_SET_WITH_MEMBERS_CONFIG } = require('./config');
const {
  memberNameStartWith,
  membersCount,
  keyName
} = POPULATE_SET_WITH_MEMBERS_CONFIG;

const client = redis.createClient(DB_CONFIG);

client.on("error", function(error) {
  console.error(error);
});

client.on("connect", function() {
  console.log('Connected to DB');
  for (let i = 0; i < membersCount; i++) {
    const memberName = `${memberNameStartWith}${Math.random()}`
    client.sadd([keyName, memberName], (error, response) => {
      if (error) throw error;
      console.log(`Added ${memberName} member to ${keyName} set`);
    } )
  }
});

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
