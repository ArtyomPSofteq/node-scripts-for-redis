const DB_CONFIG = {
  host: 'localhost',
  port: 6379,
}

const POPULATE_DB_WITH_ZSETS_СONFIG = {
  keyNameStartWith: 'zsetKey',
  count: 10000,
};

const POPULATE_DB_WITH_SETS_СONFIG = {
  keyNameStartWith: 'setKey',
  count: 10000,
};

const POPULATE_DB_WITH_LISTS_СONFIG = {
  keyNameStartWith: 'listKey',
  count: 10000,
};

const POPULATE_DB_WITH_STRINGS_СONFIG = {
  keyNameStartWith: 'tringedKey',
  keyValue: 'stringValue',
  count: 10000,
};

const POPULATE_DB_WITH_HASHES_СONFIG = {
  keyNameStartWith: 'hashKey',
  count: 10000,
};

const POPULATE_HASH_WITH_FIELDS_CONFIG = {
  keyName: 'hugeHash',
  fieldStartWith: 'abracadab',
  fieldValueStartWith: 'value',
  fieldsCount: 10000,
};

const POPULATE_ZSET_WITH_MEMBERS_CONFIG = {
  keyName: 'hugeZSet',
  memberNameStartWith: 'member',
  // The Score will be generated as an integer ranging from minScoreValue to maxScoreValue
  minScoreValue: -10,
  maxScoreValue: 10,
  membersCount: 10000,
};

const POPULATE_SET_WITH_MEMBERS_CONFIG = {
  keyName: 'hugeSet',
  memberNameStartWith: 'blamember',
  membersCount: 10000,
};

const POPULATE_LIST_WITH_ELEMENTS_CONFIG = {
  keyName: 'hugeList',
  elementStartWith: 'blaelem',
  elementsCount: 10000,
};

const DELETE_KEYS_FROM_DB_CONFIG = {
  // Key Name or patterns
  // E.g. 'key*' will try to find all keys that starts with 'key'
  // E.g. 'key' will try to find one key with name 'key;
  matchPattern: 'zsetKey*',
};

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
  POPULATE_DB_WITH_LISTS_СONFIG,
  POPULATE_LIST_WITH_ELEMENTS_CONFIG,
};
