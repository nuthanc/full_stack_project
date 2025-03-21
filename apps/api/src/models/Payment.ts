import { Model } from 'objection';

export class Payment extends Model {
  static tableName = 'payments';

  id!: number;
  booking_id!: number;
  payment_method!: string; // e.g., "credit_card", "net_banking", etc.
  payment_status!: string; // e.g., "success", "failed", "pending"
  transaction_id?: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['booking_id', 'payment_method', 'payment_status'],
      properties: {
        id: { type: 'integer' },
        booking_id: { type: 'integer' },
        payment_method: { type: 'string', minLength: 1, maxLength: 50 },
        payment_status: { type: 'string', minLength: 1, maxLength: 50 },
        transaction_id: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Booking = require('./Booking').Booking;
    return {
      booking: {
        relation: Model.BelongsToOneRelation,
        modelClass: Booking,
        join: {
          from: 'payments.booking_id',
          to: 'bookings.id',
        },
      },
    };
  }
}
