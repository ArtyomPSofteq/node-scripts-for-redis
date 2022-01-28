const redis = require("redis");
const { DB_CONFIG, POPULATE_DB_WITH_STRINGS_СONFIG } = require('./config');
const { keyNameStartWith, count, keyValue } = POPULATE_DB_WITH_STRINGS_СONFIG
const { v4: uuidv4 } = require('uuid');
const client = redis.createClient(DB_CONFIG);
// const rejson = require('redis-rejson');
const lodash = require('lodash')

const generateBigString = (size = 100, fill = 'a') => {
    return Buffer.alloc(size, fill).toString('utf8')
}

// rejson(redis);

const ELEMENTS_BIG_NUMBER = 1_000_000;
const ELEMENTS_BIG_BATCH_SIZE = 10_000;

const timeLabel = `Time for adding ${count} strings`;
client.on("error", function(error) {
  console.error(error);
});
const stringValue = ''
const elementsCount = 1;

async function generate (prefix, count = 0, separator = ':', batchSize = 1) {
    console.time(`${prefix} - ${separator} - ${count}`)
    const pipeline = [];
    for (let x = 0; x < count; x += 25_000) {
        for (let i = x; i < x + 25_000; i++) {
            const id = i + 1;
            const keyPrefix = `${prefix}${separator}${id}${separator}`

            // string
            pipeline.push(
                client.set(`${keyPrefix}string`, `${stringValue}${id}`)
            )

            // list
            const listElements = []
            for (let l = 0; l < elementsCount; l++) {
                listElements.push(`${stringValue}${id}`)
            }
            pipeline.push(client.lPush(`${keyPrefix}list`, listElements))

            // set
            const setMembers = []
            for (let l = 0; l < elementsCount; l++) {
                setMembers.push(`${stringValue}${id}`)
            }
            pipeline.push(client.sAdd(`${keyPrefix}set`, setMembers))

            // zset
            const zSetMembers = []
            for (let score = 0; score < elementsCount; score++) {
                zSetMembers.push({
                    score,
                    value: `${stringValue}${id}`,
                })
            }
            pipeline.push(client.zAdd(`${keyPrefix}zset`, zSetMembers))

            // hash
            const hashFields = []
            for (let l = 0; l < elementsCount; l++) {
                hashFields.push(`k${l}`, `${stringValue} ${id}`)
            }
            pipeline.push(client.hSet(`${keyPrefix}hash`, hashFields))

            // json
            pipeline.push(
                client.json.set(`${prefix}${separator}${id}${separator}json`,
                    '.', {
                        id,
                    }),
            )
        }
        console.log('___pipeline', pipeline.length)
        const chunks = lodash.chunk(pipeline, batchSize);

        for (let i = 0; i < chunks.length; i++) {
            console.log(`Processing chunk ${i} (${(i + 1) * chunks[i].length})...`)
            await Promise.all(chunks[i]);
        }
    }
    console.timeEnd(`${prefix} - ${separator} - ${count}`)
}

async function init() {
    await client.connect();
    console.log('Connected to DB \n');
    console.time(timeLabel);
    const count = 500_000
    const batchSize = 10_000
    const count2 = 250_000
    const batchSize2 = 10_000

    await generate('device', count, ':', batchSize)
    await generate('user', count, ':', batchSize)
    await generate('mobile', count, ':', batchSize)
    await generate('device_us-east-1', count2, '_', batchSize2)
    await generate('device_us-west-1', count2, '_', batchSize2)
    await generate('device_eu-west-1', count2, '_', batchSize2)
    await generate('device_eu-central-1', count2, '_', batchSize2)
    await generate('user_us-east-1', count2, '_', batchSize2)
    await generate('user_us-west-1', count2, '_', batchSize2)
    await generate('user_eu-west-1', count2, '_', batchSize2)
    await generate('user_eu-central-1', count2, '_', batchSize2)
    await generate('mobile_us-east-1', count2, '_', batchSize2)
    await generate('mobile_us-west-1', count2, '_', batchSize2)
    await generate('mobile_eu-west-1', count2, '_', batchSize2)
    await generate('mobile_eu-central-1', count2, '_', batchSize2)

    // ============================= big key
    await client.set(`${generateBigString(1024 * 1024, 'a')}`, `1MB key`)
    await client.set(`${generateBigString(1024 * 1024 * 2, 'b')}`, `2MB key`)
    await client.set(`${generateBigString(1024 * 1024 * 3, 'c')}`, `3MB key`)
    await client.set(`${generateBigString(1024 * 1024 * 4, 'd')}`, `4MB key`)
    await client.set(`${generateBigString(1024 * 1024 * 5, 'e')}`, `5MB key`)

    // ============================= big string
    await client.set('big string 5MB', `${generateBigString(1024 * 5, 'e')}`)

    // ============================= big list
    const listElements = []
    for (let l = 0; l < ELEMENTS_BIG_NUMBER; l++) {
        listElements.push(`${stringValue} ${l}`)
    }
    await Promise.all(lodash.chunk(listElements, ELEMENTS_BIG_BATCH_SIZE).map((batch) => {
        return client.lPush(`big list 1M`, batch);
    }))

    // ============================= big set
    const setMembers = []
    for (let l = 0; l < ELEMENTS_BIG_NUMBER; l++) {
        setMembers.push(`${stringValue} ${l}`)
    }
    await Promise.all(lodash.chunk(setMembers, ELEMENTS_BIG_BATCH_SIZE).map((batch) => {
        return client.sAdd('big set 1M', batch);
    }))

    // ============================= big zset
    const zSetMembers = []
    for (let score = 0; score < ELEMENTS_BIG_NUMBER; score++) {
        zSetMembers.push({
            score,
            value: `${stringValue} ${score}`,
        })
    }
    await Promise.all(lodash.chunk(zSetMembers, ELEMENTS_BIG_BATCH_SIZE).map((batch) => {
        return client.zAdd('big zset 1M', batch)
    }))

    // ============================= big hash
    console.time('big hset');
    const hashFields = []
    for (let l = 0; l < ELEMENTS_BIG_NUMBER; l++) {
        hashFields.push(`key${l}`, `${stringValue} ${l}`)
    }
    await Promise.all(lodash.chunk(hashFields, ELEMENTS_BIG_BATCH_SIZE).map((batch) => {
        return client.hSet('big hash 1M', batch)
    }))
    console.timeEnd('big hset')

    process.exit(0);
}

init();
