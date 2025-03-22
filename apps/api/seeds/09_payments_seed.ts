import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('payments').del();

  const statuses = ['completed', 'pending', 'failed'] as const;

  const payments: {
    booking_id: number;
    amount: number;
    status: (typeof statuses)[number];
  }[] = [];

  for (let i = 1; i <= 10; i++) {
    payments.push({
      booking_id: i,
      amount: parseFloat((Math.random() * 300 + 200).toFixed(2)), // 200–500
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  await knex('payments').insert(payments);
}
