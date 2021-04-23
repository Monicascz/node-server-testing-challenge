module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, //needed for sqlite
    connection: {
      filename: './data/dogs.db3' // name the dev whatever you want the filename to be
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    connection: {
      filename: './data/test.db3',
    },
  },
  production: {

  },
};