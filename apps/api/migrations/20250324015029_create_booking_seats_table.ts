import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('booking_seats', (table) => {
    table.increments('id').primary();
    table
      .integer('booking_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('public.bookings') // explicitly using the public schema
      .onDelete('CASCADE');

    table
      .integer('seat_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('public.seats') // explicitly using the public schema
      .onDelete('CASCADE');

    table.unique(['booking_id', 'seat_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('booking_seats');
}
