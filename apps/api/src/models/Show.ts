import { Model, QueryContext, ModelOptions } from 'objection';
import Movie from './Movie.js';
import Hall from './Hall.js';
import Booking from './Booking.js';

export default class Show extends Model {
  id!: number;
  movie_id!: number;
  hall_id!: number;
  start_time!: string;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'shows';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['movie_id', 'hall_id', 'start_time'],
      properties: {
        id: { type: 'integer' },
        movie_id: { type: 'integer' },
        hall_id: { type: 'integer' },
        start_time: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      movie: {
        relation: Model.BelongsToOneRelation,
        modelClass: Movie,
        join: {
          from: 'shows.movie_id',
          to: 'movies.id',
        },
      },
      hall: {
        relation: Model.BelongsToOneRelation,
        modelClass: Hall,
        join: {
          from: 'shows.hall_id',
          to: 'halls.id',
        },
      },
      bookings: {
        relation: Model.HasManyRelation,
        modelClass: Booking,
        join: {
          from: 'shows.id',
          to: 'bookings.show_id',
        },
      },
    };
  }

  async $beforeInsert(context: QueryContext): Promise<void> {
    await super.$beforeInsert(context);
    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
  }

  async $beforeUpdate(opt: ModelOptions, context: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, context);
    this.updated_at = new Date().toISOString();
  }
}
