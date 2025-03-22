import { Knex } from 'knex';

function addHours(date: Date, hours: number): Date {
  const copy = new Date(date);
  copy.setHours(copy.getHours() + hours);
  return copy;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('shows').del();

  const now = new Date();

  await knex('shows').insert([
    { movie_id: 1, hall_id: 1, start_time: addHours(now, 2) },
    { movie_id: 2, hall_id: 2, start_time: addHours(now, 4) },
    { movie_id: 3, hall_id: 3, start_time: addHours(now, 6) },
    { movie_id: 4, hall_id: 4, start_time: addHours(now, 8) },
    { movie_id: 5, hall_id: 5, start_time: addHours(now, 10) },
    { movie_id: 1, hall_id: 2, start_time: addHours(now, 24) },
    { movie_id: 2, hall_id: 3, start_time: addHours(now, 26) },
    { movie_id: 3, hall_id: 4, start_time: addHours(now, 28) },
    { movie_id: 4, hall_id: 5, start_time: addHours(now, 30) },
    { movie_id: 5, hall_id: 1, start_time: addHours(now, 32) },
  ]);
}
