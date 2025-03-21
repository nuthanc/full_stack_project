import { Model } from 'objection';

export class Booking extends Model {
  static tableName = 'bookings';

  id!: number;
  user_id!: number;
  show_id!: number;
  booking_time!: string; // ISO date-time string
  total_amount!: number;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'show_id', 'booking_time', 'total_amount'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        show_id: { type: 'integer' },
        booking_time: { type: 'string', format: 'date-time' },
        total_amount: { type: 'number' },
      },
    };
  }

  static get relationMappings() {
    const User = require('./User').User;
    const Show = require('./Show').Show;
    const Payment = require('./Payment').Payment;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'bookings.user_id',
          to: 'users.id',
        },
      },
      show: {
        relation: Model.BelongsToOneRelation,
        modelClass: Show,
        join: {
          from: 'bookings.show_id',
          to: 'shows.id',
        },
      },
      payment: {
        relation: Model.HasOneRelation,
        modelClass: Payment,
        join: {
          from: 'bookings.id',
          to: 'payments.booking_id',
        },
      },
    };
  }
}
