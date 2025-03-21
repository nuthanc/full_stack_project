import { Model } from 'objection';

export class Show extends Model {
  static tableName = 'shows';

  id!: number;
  movie_id!: number;
  hall_id!: number;
  start_time!: string; // ISO date-time string
  end_time!: string; // ISO date-time string

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['movie_id', 'hall_id', 'start_time', 'end_time'],
      properties: {
        id: { type: 'integer' },
        movie_id: { type: 'integer' },
        hall_id: { type: 'integer' },
        start_time: { type: 'string', format: 'date-time' },
        end_time: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    const Movie = require('./Movie').Movie;
    const Hall = require('./Hall').Hall;
    const Booking = require('./Booking').Booking;
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
}
