import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cities').del();

  // Inserts seed entries
  await knex('cities').insert([
    { name: 'Springfield' },
    { name: 'Gotham' },
    { name: 'Metropolis' },
    { name: 'Riverdale' },
    { name: 'Sunnyvale' },
    { name: 'Hill Valley' },
    { name: 'Stars Hollow' },
    { name: 'Kings Landing' },
    { name: 'Wakanda' },
    { name: 'Elk Grove' },
  ]);
}
