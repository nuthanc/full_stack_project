import knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile';

// Determine the environment (default to development)
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
const knexInstance = knex(config);

// Bind all Objection models to the Knex instance
Model.knex(knexInstance);

export default knexInstance;
