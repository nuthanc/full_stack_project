import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('theatres').del();

  // Inserts seed entries
  await knex('theatres').insert([
    { name: 'Grand Cinema', city_id: 1 },
    { name: 'Skyline Theatres', city_id: 2 },
    { name: 'Moonlight Screens', city_id: 3 },
    { name: 'Silver Oak Theatre', city_id: 4 },
    { name: 'Galaxy Cinemas', city_id: 5 },
    { name: 'Neon Palace', city_id: 1 },
    { name: 'CineHub Downtown', city_id: 2 },
    { name: 'Starview Cinemas', city_id: 3 },
    { name: 'Theatre Royale', city_id: 4 },
    { name: 'Aurora Screens', city_id: 5 },
  ]);
}
