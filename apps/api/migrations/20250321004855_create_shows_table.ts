import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('shows', (table) => {
    table.increments('id').primary();
    table
      .integer('movie_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('movies')
      .onDelete('CASCADE');
    table
      .integer('hall_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('halls')
      .onDelete('CASCADE');
    table.timestamp('start_time').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.index(['movie_id'], 'idx_shows_movie_id');
    table.index(['hall_id'], 'idx_shows_hall_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('shows');
}
