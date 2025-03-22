import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('bookings').del();

  await knex('bookings').insert([
    { user_id: 1, show_id: 1, seat_ids: [1, 2] },
    { user_id: 2, show_id: 1, seat_ids: [3] },
    { user_id: 3, show_id: 2, seat_ids: [4, 5] },
    { user_id: 4, show_id: 2, seat_ids: [6] },
    { user_id: 5, show_id: 3, seat_ids: [7, 8] },
    { user_id: 1, show_id: 4, seat_ids: [9] },
    { user_id: 2, show_id: 4, seat_ids: [10, 11] },
    { user_id: 3, show_id: 5, seat_ids: [12] },
    { user_id: 4, show_id: 5, seat_ids: [13, 14] },
    { user_id: 5, show_id: 1, seat_ids: [15] },
  ]);
}
