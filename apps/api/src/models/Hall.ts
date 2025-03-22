import { Model, QueryContext, ModelOptions } from 'objection';
import Theatre from './Theatre.js';
import Seat from './Seat.js';
import Show from './Show.js';

export default class Hall extends Model {
  id!: number;
  name!: string;
  theatre_id!: number;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'halls';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'theatre_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        theatre_id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      theatre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Theatre,
        join: {
          from: 'halls.theatre_id',
          to: 'theatres.id',
        },
      },
      seats: {
        relation: Model.HasManyRelation,
        modelClass: Seat,
        join: {
          from: 'halls.id',
          to: 'seats.hall_id',
        },
      },
      shows: {
        relation: Model.HasManyRelation,
        modelClass: Show,
        join: {
          from: 'halls.id',
          to: 'shows.hall_id',
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
