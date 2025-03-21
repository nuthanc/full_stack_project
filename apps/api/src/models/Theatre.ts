import { Model } from 'objection';

export class Theatre extends Model {
  static tableName = 'theatres';

  id!: number;
  name!: string;
  city_id!: number;
  address?: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'city_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        city_id: { type: 'integer' },
        address: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const City = require('./City').City;
    const Hall = require('./Hall').Hall;
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
}
