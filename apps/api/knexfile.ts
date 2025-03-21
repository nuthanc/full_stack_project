import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'book_my_show',
      user: process.env.DB_USER || 'book_my_show_admin',
      password: process.env.DB_PASSWORD || 'admin',
    },
    migrations: {
      directory: './migrations', // Migrations folder at the project root
    },
    seeds: {
      directory: './seeds', // Optional: for seed files if needed
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
