import knex from 'knex';
import { attachPaginate } from 'knex-paginate';
attachPaginate();

const connection = knex({
  client: 'pg',
  connection: {
    database: "sotran",
    user: "postgres",
    password: "root"
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

export default connection;