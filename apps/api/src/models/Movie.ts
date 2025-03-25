import { Model, QueryContext, ModelOptions } from 'objection';
import Show from './Show';

export default class Movie extends Model {
  id!: number;
  title!: string;
  description?: string;
  duration!: number;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'movies';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'duration'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        duration: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
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
