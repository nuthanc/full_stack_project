import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description');
    table.integer('duration').notNullable(); // Duration in minutes
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.index(['title'], 'idx_movies_title');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('movies');
}
