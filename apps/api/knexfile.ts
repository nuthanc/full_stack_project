import type { Knex } from 'knex';

// const connectionString =
//   process.env.DATABASE_URL ||
//   'postgres://book_my_show_admin:admin@localhost:5432/book_my_show?search_path=public';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'book_my_show',
      user: process.env.DB_USER || 'book_my_show_admin',
      password: process.env.DB_PASSWORD || 'admin',
    },
    // connection: connectionString,
    searchPath: ['public'],
    migrations: {
      directory: './migrations', // Migrations folder at the project root
      schemaName: 'public',
    },
    // pool: {
    //   afterCreate: (
    //     conn: any,
    //     done: (err: Error | null, conn: any) => void
    //   ) => {
    //     conn.query('SET search_path TO public', (err: Error | null) => {
    //       done(err, conn);
    //     });
    //   },
    // },
    seeds: {
      directory: './seeds', // Optional: for seed files if needed
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['public'],
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
