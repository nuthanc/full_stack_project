import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('seats', (table) => {
    table.increments('id').primary();
    table
      .integer('hall_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('halls')
      .onDelete('CASCADE');
    table.string('seat_number', 50).notNullable();
    table.boolean('is_booked').defaultTo(false);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.unique(['hall_id', 'seat_number'], 'uq_seats_hall_seat');
    table.index(['hall_id'], 'idx_seats_hall_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('seats');
}
