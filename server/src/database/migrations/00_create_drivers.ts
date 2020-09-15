import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('drivers', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('telefone').notNullable();
    table.string('cpfCnpj');
    table.string('endereco');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('drivers');
}