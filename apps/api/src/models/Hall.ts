import { Model } from 'objection';

export class Hall extends Model {
  static tableName = 'halls';

  id!: number;
  name!: string;
  theatre_id!: number;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'theatre_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        theatre_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    const Theatre = require('./Theatre').Theatre;
    const Show = require('./Show').Show;
    return {
      theatre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Theatre,
        join: {
          from: 'halls.theatre_id',
          to: 'theatres.id',
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
}
