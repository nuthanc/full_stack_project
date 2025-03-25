// src/models/Seat.ts
import { Model, QueryContext, ModelOptions } from 'objection';
import Hall from './Hall';
import BookingSeat from './BookingSeat';
import Booking from './Booking';

export default class Seat extends Model {
  id!: number;
  hall_id!: number;
  seat_number!: string;
  is_booked = false;
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'seats';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['hall_id', 'seat_number'],
      properties: {
        id: { type: 'integer' },
        hall_id: { type: 'integer' },
        seat_number: { type: 'string', minLength: 1, maxLength: 50 },
        is_booked: { type: 'boolean', default: false },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      hall: {
        relation: Model.BelongsToOneRelation,
        modelClass: Hall,
        join: {
          from: 'seats.hall_id',
          to: 'halls.id',
        },
      },
      bookingSeats: {
        relation: Model.HasManyRelation,
        modelClass: BookingSeat,
        join: {
          from: 'seats.id',
          to: 'booking_seats.seat_id',
        },
      },
      bookings: {
        relation: Model.ManyToManyRelation,
        modelClass: Booking,
        join: {
          from: 'seats.id',
          through: {
            from: 'booking_seats.seat_id',
            to: 'booking_seats.booking_id',
          },
          to: 'bookings.id',
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
