import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('theatres', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table
      .integer('city_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cities')
      .onDelete('CASCADE');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.index(['city_id'], 'idx_theatres_city_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('theatres');
}
