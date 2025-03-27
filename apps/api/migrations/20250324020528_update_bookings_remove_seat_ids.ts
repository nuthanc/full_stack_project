import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('bookings', (table) => {
    table.dropColumn('seat_ids');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('bookings', (table) => {
    // Set a default empty array to avoid null values on existing rows
    table.specificType('seat_ids', 'integer[]').notNullable().defaultTo('{}');
  });
}
