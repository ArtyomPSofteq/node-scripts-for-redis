# Scripts for Redis Database

## Description
Scripts for Redis Database

## Prerequisites

Make sure you have installed following packages:
* [Node](https://nodejs.org/en/download/) >= 8.0
* [npm](https://www.npmjs.com/get-npm) >= 5 

## Getting started

### Installation

```bash
$ npm install
```

### Scripts configuration

Each script has its own config object inside the config.js file

```
const DB_CONFIG = {
  host: 'localhost',
  port: 7001,
  password: '',
}

const POPULATE_DB_WITH_ZSETS_СONFIG = {
  keyNameStartWith: 'key',
  count: 10,
}

...

```

### Running the scripts

```bash
# Add strings to the databse
$ node populate-db-with-strings.js

# Add zsets to the databse
$ node populate-db-with-zsets.js

# Add sets to the databse
$ node populate-db-with-sets.js

# Add hashes to the databse
$ node populate-db-with-hashes.js

# Add lists to the databse
$ node populate-db-with-lists.js

# Populate zset with members
$ node populate-zset-with-members.js


# Delete all the keys of all the existing databases
$ node flush-db.js

# Delete multiple keys from the selected database
$ delete-keys-from-db.js

```
