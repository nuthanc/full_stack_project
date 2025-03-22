import { Model, QueryContext, ModelOptions } from 'objection';
import User from './User.js';
import Show from './Show.js';
import Payment from './Payment.js';

export default class Booking extends Model {
  id!: number;
  user_id!: number;
  show_id!: number;
  seat_ids!: number[];
  booking_time!: string;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'bookings';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'show_id', 'seat_ids'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        show_id: { type: 'integer' },
        seat_ids: {
          type: 'array',
          items: { type: 'integer' },
        },
        booking_time: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
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

  async $beforeInsert(context: QueryContext): Promise<void> {
    await super.$beforeInsert(context);
    const now = new Date().toISOString();
    this.booking_time = now;
    this.created_at = now;
    this.updated_at = now;
  }

  async $beforeUpdate(opt: ModelOptions, context: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, context);
    this.updated_at = new Date().toISOString();
  }
}
