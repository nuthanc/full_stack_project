import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('halls').del();

  // Inserts seed entries
  await knex('halls').insert([
    { name: 'Hall A', theatre_id: 1 },
    { name: 'Hall B', theatre_id: 1 },
    { name: 'Hall C', theatre_id: 2 },
    { name: 'Hall D', theatre_id: 2 },
    { name: 'Hall E', theatre_id: 3 },
    { name: 'Hall F', theatre_id: 3 },
    { name: 'Hall G', theatre_id: 4 },
    { name: 'Hall H', theatre_id: 4 },
    { name: 'Hall I', theatre_id: 5 },
    { name: 'Hall J', theatre_id: 5 },
  ]);
}
