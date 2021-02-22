const DB_CONFIG = {
  host: 'localhost',
  port: 7003,
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
  keyNameStartWith: 'tringedKey',
  keyValue: 'stringValue',
  count: 50,
}

const POPULATE_DB_WITH_HASHES_СONFIG = {
  keyNameStartWith: 'hashKey',
  count: 10,
}

const POPULATE_HASH_WITH_FIELDS_CONFIG = {
  keyName: 'testHash',
  fieldStartWith: 'abracadab',
  fieldValueStartWith: 'value',
  fieldsCount: 1000,
}

const POPULATE_ZSET_WITH_MEMBERS_CONFIG = {
  keyName: 'testZset',
  memberNameStartWith: 'member',
  // The Score will be generated as an integer ranging from minScoreValue to maxScoreValue
  minScoreValue: -10,
  maxScoreValue: 10,
  membersCount: 1000,
}

const POPULATE_SET_WITH_MEMBERS_CONFIG = {
  keyName: 'testSet',
  memberNameStartWith: 'blamember',
  membersCount: 20,
}

const DELETE_KEYS_FROM_DB_CONFIG = {
  // Key Name or patterns
  // E.g. 'key*' will try to find all keys that starts with 'key'
  // E.g. 'key' will try to find one key with name 'key;
  matchPattern: 'zsetKey*',
}

module.exports = {
  DB_CONFIG,
  POPULATE_DB_WITH_ZSETS_СONFIG,
  POPULATE_DB_WITH_STRINGS_СONFIG,
  POPULATE_ZSET_WITH_MEMBERS_CONFIG,
  DELETE_KEYS_FROM_DB_CONFIG,
  POPULATE_DB_WITH_HASHES_СONFIG,
  POPULATE_HASH_WITH_FIELDS_CONFIG,
  POPULATE_DB_WITH_SETS_СONFIG,
  POPULATE_SET_WITH_MEMBERS_CONFIG,
  POPULATE_DB_WITH_LISTS_СONFIG
}
