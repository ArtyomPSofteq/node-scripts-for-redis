const DB_CONFIG = {
  host: 'localhost',
  port: 7001,
}

const POPULATE_DB_WITH_ZSETS_СONFIG = {
  keyNameStartWith: 'zsetKey',
  count: 10,
}

const POPULATE_DB_WITH_SETS_СONFIG = {
  keyNameStartWith: 'setKey',
  count: 10,
}

const POPULATE_DB_WITH_LISTS_СONFIG = {
  keyNameStartWith: 'listKey',
  count: 10,
}

const POPULATE_DB_WITH_STRINGS_СONFIG = {
  keyNameStartWith: 'stringKey',
  keyValue: 'stringValue',
  count: 10,
}

const POPULATE_DB_WITH_HASHES_СONFIG = {
  keyNameStartWith: 'hashKey',
  count: 10,
}

const POPULATE_ZSET_WITH_MEMBERS_CONFIG = {
  keyName: 'key',
  memberNameStartWith: 'member',
  // The Score will be generated as an integer ranging from minScoreValue to maxScoreValue
  minScoreValue: -10,
  maxScoreValue: 10,
  membersCount: 10,
}

const DELETE_KEYS_FROM_DB_CONFIG = {
  // Key Name or patterns
  // E.g. 'key*' will try to find all keys that starts with 'key'
  // E.g. 'key' will try to find one key with name 'key;
  matchPattern: 'key*',
}

module.exports = {
  DB_CONFIG,
  POPULATE_DB_WITH_ZSETS_СONFIG,
  POPULATE_DB_WITH_STRINGS_СONFIG,
  POPULATE_ZSET_WITH_MEMBERS_CONFIG,
  DELETE_KEYS_FROM_DB_CONFIG,
  POPULATE_DB_WITH_HASHES_СONFIG,
  POPULATE_DB_WITH_SETS_СONFIG,
  POPULATE_DB_WITH_LISTS_СONFIG
}
