import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('bookings').del();
  const now = new Date().toISOString();

  const bookingsData = Array.from({ length: 10 }, (_, i) => ({
    user_id: (i % 5) + 1, // Cycle through 1 to 5
    show_id: ((i + 2) % 5) + 1, // Slight variation to mix up show_ids
    booking_time: now,
    created_at: now,
    updated_at: now,
  }));

  await knex('bookings').insert(bookingsData);
}
