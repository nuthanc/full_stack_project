import { Model } from 'objection';

export class User extends Model {
  static tableName = 'users';

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string; // 'admin' or 'client'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password', 'role'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1 },
        role: { type: 'string', enum: ['admin', 'client'] },
      },
    };
  }

  static get relationMappings() {
    // Define relations later as needed (e.g., bookings)
    return {};
  }
}
