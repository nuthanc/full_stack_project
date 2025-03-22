import { Model, QueryContext, ModelOptions } from 'objection';
import Theatre from './Theatre.js';

export default class City extends Model {
  id!: number;
  name!: string;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'cities';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      theatres: {
        relation: Model.HasManyRelation,
        modelClass: Theatre,
        join: {
          from: 'cities.id',
          to: 'theatres.city_id',
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
