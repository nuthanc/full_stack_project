import { Model } from 'objection';

export class Movie extends Model {
  static tableName = 'movies';

  id!: number;
  title!: string;
  description?: string;
  duration?: number; // in minutes
  language?: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        duration: { type: 'number' },
        language: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Show = require('./Show').Show;
    return {
      shows: {
        relation: Model.HasManyRelation,
        modelClass: Show,
        join: {
          from: 'movies.id',
          to: 'shows.movie_id',
        },
      },
    };
  }
}
