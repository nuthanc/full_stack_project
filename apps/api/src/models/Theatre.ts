import { Model, QueryContext, ModelOptions } from 'objection';
import City from './City.js';
import Hall from './Hall.js';

export default class Theatre extends Model {
  id!: number;
  name!: string;
  city_id!: number;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'theatres';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'city_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        city_id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        join: {
          from: 'theatres.city_id',
          to: 'cities.id',
        },
      },
      halls: {
        relation: Model.HasManyRelation,
        modelClass: Hall,
        join: {
          from: 'theatres.id',
          to: 'halls.theatre_id',
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
