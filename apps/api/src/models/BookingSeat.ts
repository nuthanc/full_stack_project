// src/models/BookingSeat.ts
import { Model } from 'objection';
import Booking from './Booking';
import Seat from './Seat';

export default class BookingSeat extends Model {
  id!: number;
  booking_id!: number;
  seat_id!: number;

  static get tableName() {
    return 'booking_seats';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['booking_id', 'seat_id'],
      properties: {
        id: { type: 'integer' },
        booking_id: { type: 'integer' },
        seat_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      booking: {
        relation: Model.BelongsToOneRelation,
        modelClass: Booking,
        join: {
          from: 'booking_seats.booking_id',
          to: 'bookings.id',
        },
      },
      seat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Seat,
        join: {
          from: 'booking_seats.seat_id',
          to: 'seats.id',
        },
      },
    };
  }
}
