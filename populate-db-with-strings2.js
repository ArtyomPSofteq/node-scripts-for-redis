const redis = require("redis");
const { DB_CONFIG, POPULATE_DB_WITH_STRINGS_СONFIG } = require('./config');
const { keyNameStartWith, count, keyValue } = POPULATE_DB_WITH_STRINGS_СONFIG
const client = redis.createClient(DB_CONFIG);

const sleep = (ms) =>  new Promise((r) => setTimeout(r, ms))

async function init() {
    await client.connect();
    for (let i = 1; i <= 100000; i++) {
        const keyName = `__${keyNameStartWith}${i}`
        await sleep(10);
        // await sleep(50);
        // await sleep(100);
        // await client.set([keyName, keyValue])
        await client.set(keyName, keyValue)
    }

}

init();
