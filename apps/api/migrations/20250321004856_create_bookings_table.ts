import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('show_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('shows')
      .onDelete('CASCADE');
    // Using PostgreSQL array type to store seat IDs
    table.specificType('seat_ids', 'integer[]').notNullable();
    table
      .timestamp('booking_time', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.index(['user_id'], 'idx_bookings_user_id');
    table.index(['show_id'], 'idx_bookings_show_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('bookings');
}
