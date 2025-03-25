import { Model, QueryContext, ModelOptions } from 'objection';
import Booking from './Booking';

export default class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role: 'client' | 'admin' = 'client';
  created_at?: string;
  updated_at?: string;

  static get tableName(): string {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6, maxLength: 255 },
        role: { type: 'string', enum: ['client', 'admin'], default: 'client' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      bookings: {
        relation: Model.HasManyRelation,
        modelClass: Booking,
        join: {
          from: 'users.id',
          to: 'bookings.user_id',
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
