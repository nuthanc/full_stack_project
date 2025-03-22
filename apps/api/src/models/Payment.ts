import { Model, QueryContext, ModelOptions } from 'objection';
import Booking from './Booking.js';

export default class Payment extends Model {
  id!: number;
  booking_id!: number;
  amount!: number;
  status!: 'pending' | 'completed' | 'failed';
  payment_time!: string;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'payments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['booking_id', 'amount', 'status'],
      properties: {
        id: { type: 'integer' },
        booking_id: { type: 'integer' },
        amount: { type: 'number' },
        status: { type: 'string', enum: ['pending', 'completed', 'failed'] },
        payment_time: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
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

  async $beforeInsert(context: QueryContext): Promise<void> {
    await super.$beforeInsert(context);
    const now = new Date().toISOString();
    this.payment_time = now;
    this.created_at = now;
    this.updated_at = now;
  }

  async $beforeUpdate(opt: ModelOptions, context: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, context);
    this.updated_at = new Date().toISOString();
  }
}
