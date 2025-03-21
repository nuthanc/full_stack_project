import { Model } from 'objection';

export class City extends Model {
  static tableName = 'cities';

  id!: number;
  name!: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    const Theatre = require('./Theatre').Theatre;
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
}
