export async function up(knex) {
  await knex.schema.createTable('booking_seats', (table) => {
    table.increments('id').primary();
    table
      .integer('booking_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('bookings')
      .onDelete('CASCADE');

    table
      .integer('seat_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('seats')
      .onDelete('CASCADE');

    table.unique(['booking_id', 'seat_id']); // prevent duplicate entries
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('booking_seats');
}
