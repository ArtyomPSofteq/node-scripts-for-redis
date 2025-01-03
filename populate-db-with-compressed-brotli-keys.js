const redis = require('redis');
const pickle = require('chromium-pickle-js');
const msgpackr = require('msgpackr');
const utf8 = require('@stablelib/utf8');
const rejson = require('redis-rejson');
const protobuf = require('protobufjs');
const brotli = require('brotli-wasm');
const fs = require('fs');
const { DB_CONFIG, POPULATE_DB_WITH_UNFORMATTED_KEYS } = require('./config');
const fflate = require('fflate');
const { itemsKeyCount } = POPULATE_DB_WITH_UNFORMATTED_KEYS;

rejson(redis);

const client = redis.createClient(DB_CONFIG);
const timeLabel = `Time for adding unsupported format keys`;

const COMPRESSED_PREFIX = 'Comp';
const BROTLI_PREFIX = 'BROTLI';

client.on('error', function (error) {
  console.error(error);
});

client.on('connect', async function () {
  console.log('Connected to DB \n');
  console.time(timeLabel);
  // test();

  // don't needed:
  // HEX, Binary

  await createBrotliCompressedKeys();

  console.timeEnd(timeLabel);

  setTimeout(() => {
    process.exit();
  }, 1000);
});

const createBrotliCompressedKeys = async () => {
  await createBrotliUnicodeKeys();
  await createBrotliASCIIKeys();
  await createBrotliJSONKeys();
  await createBrotliPHPUnserializedJSONKeys();
  await createBrotliMsgpackKeys();
  await createBrotliProtobufKeys();
  await createBrotliPickleKeys();
  await createBrotliJavaSerializedObjectKeys();
  await createBrotliVectorKeys();
};

// Brotli
const createBrotliUnicodeKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:Unicode`;
  const rawValue = '漢字';

  const buf = utf8.encode(rawValue);
  const value = Buffer.from(await brotli.compress(buf));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createBrotliASCIIKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:ASCII`;
  const rawValue = '\xac\xed\x00\x05t\x0a4102';
  const buf = fflate.strToU8(rawValue);
  const value = Buffer.from(await brotli.compress(buf));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createBrotliVectorKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:Vector`;
  const rawValue = JSON.parse(fs.readFileSync('./testFiles/vector.json', 'utf8'));
  const buf = fflate.strToU8(rawValue);
  const value = Buffer.from(await brotli.compress(buf));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createBrotliJSONKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:JSON`;
  const rawValue = '{"test":"test"}';

  const buf = fflate.strToU8(rawValue);

  const value = Buffer.from(await brotli.compress(buf));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createBrotliPHPUnserializedJSONKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:PHP`;
  const rawValue = 'a:2:{i:0;s:12:"Sample array";i:1;a:2:{i:0;s:5:"Apple";i:1;s:6:"Orange";}}';

  const buf = fflate.strToU8(rawValue);

  const value = Buffer.from(await brotli.compress(buf));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createBrotliJavaSerializedObjectKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:Java`;
  const rawValue = fs.readFileSync('./testFiles/test_serialised_obj.ser');
  const rawValue2 = fs.readFileSync('./testFiles/test_annotated_obj.ser');

  const value = Buffer.from(await brotli.compress(rawValue));
  const value2 = Buffer.from(await brotli.compress(rawValue2));

  createString(prefix, value);
  createSet(prefix, value, true, value2);
  createZSet(prefix, value, true, value2);
  createList(prefix, value, true, value2);
  createHash(prefix, value, true, value2);
  createStream(prefix, value, true, value2);
};

const createBrotliMsgpackKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:Msgpack`;
  const rawValue = msgpackr.pack({
    hello: 'World',
    array: [1, 2],
    obj: { test: 'test' },
    boolean: false,
  });

  const value = Buffer.from(await brotli.compress(rawValue));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createBrotliProtobufKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:Proto`;

  protobuf.load('./testFiles/awesome.proto', async function (err, root) {
    if (err) throw err;

    // Obtain a message type
    const Book = root.lookupType('com.book.BookStore');

    // Exemplary payload
    const payloadBookStore = {
      name: 'Test name',
      books: { 0: 'book 1', 1: 'book 2' },
    };

    // Create a new message
    const message = Book.create(payloadBookStore); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const rawValue = Book.encode(message).finish();

    const value = Buffer.from(await brotli.compress(rawValue));
    // ... do something with buffer

    createString(prefix, value);
    createSet(prefix, value, true);
    createZSet(prefix, value, true);
    createList(prefix, value, true);
    createHash(prefix, value, true);
    createStream(prefix, value, true);
  });

  // protobuf.load('./testFiles/protobuf2.proto', function (err, root) {
  //   if (err) throw err;

  //   // Obtain a message type
  //   const AwesomeMessage = root.lookupType('awesomepackage.AwesomeMessage');

  //   // Exemplary payload
  //   const payload = {
  //     awesomeField: 'AwesomeString',
  //     awesomeField2: 'AwesomeString2',
  //   };

  //   // Create a new message
  //   // const message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
  //   const message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

  //   // Encode a message to an Uint8Array (browser) or Buffer (node)
  //   const value = AwesomeMessage.encode(message).finish();
  //   // ... do something with buffer

  //   createSet(prefix, value, true);
  //   createZSet(prefix, value, true);
  //   createList(prefix, value, true);
  //   createHash(prefix, value, true);
  //   createStream(prefix, value, true);
  // });
};

const createBrotliPickleKeys = async () => {
  const prefix = `${COMPRESSED_PREFIX}:${BROTLI_PREFIX}:Pickle`;

  const rawValue = fs.readFileSync('./testFiles/pickleFile1.pickle');
  const value2 = fs.readFileSync('./testFiles/pickleFile2.pickle');
  // const value5 = fs.readFileSync('./pickleFile5.pickle');

  const value = Buffer.from(await brotli.compress(rawValue));

  createString(prefix, value);
  createSet(prefix, value, true);
  createZSet(prefix, value, true);
  createList(prefix, value, true);
  createHash(prefix, value, true);
  createStream(prefix, value, true);
};

const createString = (prefix, value) => {
  client.set(`${prefix}:string`, value, (error, response) => {
    if (error) throw error;
  });
};

const createSet = (prefix, value, onlyOneItem = false, value2 = '') => {
  let members = [];

  for (let i = 0; i < itemsKeyCount; i++) {
    const memberName = `${value}${itemsKeyCount}${Math.random()}`;
    members.push(memberName);
  }

  if (onlyOneItem) {
    members = [value];
  }
  if (value2) members.push(value2);

  client.sadd(`${prefix}:set`, members, (error, response) => {
    if (error) throw error;
  });
};

const createZSet = (prefix, value, onlyOneItem = false, value2 = '') => {
  let members = [];
  for (let i = 0; i < itemsKeyCount; i++) {
    const memberName = `${value}${itemsKeyCount}${Math.random()}`;
    const scoreValue = random(-10, 10);
    members.push(scoreValue, memberName);
  }

  if (onlyOneItem) {
    members = [1, value];
  }
  if (value2) members.push(2, value2);

  client.zadd(`${prefix}:zset`, members, (error, response) => {
    if (error) throw error;
  });
};

const createList = (prefix, value, onlyOneItem = false, value2 = '') => {
  let elements = [];
  for (let i = 0; i < itemsKeyCount; i++) {
    const randomNumber = Math.random();
    const element = `${value}${randomNumber}`;
    elements.push(element);
  }

  if (onlyOneItem) {
    elements = [value];
  }
  if (value2) elements.push(value2);

  client.lpush(`${prefix}:list`, elements, (error, response) => {
    if (error) throw error;
  });
};

const createHash = (prefix, value, onlyOneItem = false, value2 = '') => {
  let fields = [];
  for (let i = 0; i < itemsKeyCount; i++) {
    const randomNumber = Array.from({ length: 5 }).fill(Math.random());
    const field = `${value}${randomNumber.toString()}`;
    const fieldValue = `${value}${randomNumber}`;
    fields.push(field, fieldValue);
  }

  if (onlyOneItem) {
    fields = [value, value];
  }
  if (value2) fields.push(value2, value2);

  client.hset(`${prefix}:hash`, fields, (error, response) => {
    if (error) throw error;
  });
};

const createStream = (prefix, value, onlyOneItem = false, value2 = '') => {
  for (let i = 0; i < (!onlyOneItem ? itemsKeyCount : 1); i++) {
    client.xadd(
        `${prefix}:stream`,
        '*',
        value,
        value,
        `${value2 || value}1`,
        `${value2 || value}1`,
        (error, response) => {
          if (error) throw error;
        }
    );
  }
};

const createJSON = (prefix, value) => {
  const keyName = `${prefix}:json`;
  client.json_set(keyName, '.', value, (error, response) => {
    if (error) throw error;
    console.timeEnd(timeLabel);
    process.exit();
  });
};

// const test = () => {
//   const prefix = 'Test';

//   const msg = msgpackr.pack({
//     hello: 'World',
//     array: [1, 2],
//     obj: { test: 'test' },
//     boolean: false,
//   });

//   const value = `{"test": "\xac\xed\x00\x05t\x0a4102"}`;
//   createJSON(prefix, value);

//   // client.set('1', value, (error, response) => {
//   //   if (error) throw error;
//   //   // process.exit();
//   // });
// };

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function toHex(str) {
  const result = '';
  for (const i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
