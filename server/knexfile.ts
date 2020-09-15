// Update with your config settings.
import path from 'path';

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "sotran",
      user: "postgres",
      password: "root"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "sotran",
      user: "postgres",
      password: "root"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  }

};
