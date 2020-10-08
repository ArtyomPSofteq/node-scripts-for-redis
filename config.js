const DB_CONFIG = {
  host: 'localhost',
  port: 7001,
}
const POPULATE_DB_WITH_ZSETS_СONFIG = {
  keyNameStartWith: 'key',
  count: 10,
}

const POPULATE_ZSET_WITH_MEMBERS = {
  keyName: 'key',
  memberNameStartWith: 'member',
  count: 10,
}

module.exports = {
  DB_CONFIG,
  POPULATE_DB_WITH_ZSETS_СONFIG,
  POPULATE_ZSET_WITH_MEMBERS
}
