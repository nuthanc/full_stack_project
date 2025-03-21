import { Model } from 'objection';

export class Seat extends Model {
  static tableName = 'seats';

  id!: number;
  hall_id!: number;
  seat_number!: string; // e.g., "A1", "B2"
  is_available!: boolean;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['hall_id', 'seat_number'],
      properties: {
        id: { type: 'integer' },
        hall_id: { type: 'integer' },
        seat_number: { type: 'string', minLength: 1, maxLength: 10 },
        is_available: { type: 'boolean' },
      },
    };
  }

  static get relationMappings() {
    const Hall = require('./Hall').Hall;
    return {
      hall: {
        relation: Model.BelongsToOneRelation,
        modelClass: Hall,
        join: {
          from: 'seats.hall_id',
          to: 'halls.id',
        },
      },
    };
  }
}
