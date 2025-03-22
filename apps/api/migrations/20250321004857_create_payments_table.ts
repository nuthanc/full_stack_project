import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table
      .integer('booking_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('bookings')
      .onDelete('CASCADE');
    table.decimal('amount', 10, 2).notNullable();
    table
      .enu('status', ['pending', 'completed', 'failed'], {
        useNative: true,
        enumName: 'payment_status',
      })
      .notNullable()
      .defaultTo('pending');
    table
      .timestamp('payment_time', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.index(['booking_id'], 'idx_payments_booking_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('payments');
}
