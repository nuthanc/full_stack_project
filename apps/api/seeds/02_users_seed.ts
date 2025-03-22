import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'alice01',
      email: 'alice@example.com',
      password: 'password123',
      role: 'client',
    },
    {
      username: 'bobster',
      email: 'bob@example.com',
      password: 'securepass456',
      role: 'client',
    },
    {
      username: 'charlie_dev',
      email: 'charlie@example.com',
      password: 'devcharlie789',
      role: 'admin',
    },
    {
      username: 'diana_x',
      email: 'diana@example.com',
      password: 'diana_pw',
      role: 'client',
    },
    {
      username: 'edwin_t',
      email: 'edwin@example.com',
      password: 'edwinpass',
      role: 'client',
    },
    {
      username: 'fiona88',
      email: 'fiona@example.com',
      password: 'fiona_secret',
      role: 'admin',
    },
    {
      username: 'greg99',
      email: 'greg@example.com',
      password: 'gregpass99',
      role: 'client',
    },
    {
      username: 'hannah_s',
      email: 'hannah@example.com',
      password: 'hannah_pw',
      role: 'client',
    },
    {
      username: 'ivan_the_admin',
      email: 'ivan@example.com',
      password: 'adminivan',
      role: 'admin',
    },
    {
      username: 'julia.j',
      email: 'julia@example.com',
      password: 'juliapass',
      role: 'client',
    },
  ]);
}
