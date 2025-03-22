import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('halls', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table
      .integer('theatre_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('theatres')
      .onDelete('CASCADE');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.index(['theatre_id'], 'idx_halls_theatre_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('halls');
}
