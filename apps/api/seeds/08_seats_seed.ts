import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('seats').del();

  const seats: {
    hall_id: number;
    seat_number: string;
    is_booked: boolean;
  }[] = [];

  const seatLabels = ['A', 'B', 'C', 'D', 'E'];

  for (let hallId = 1; hallId <= 3; hallId++) {
    for (let i = 1; i <= 10; i++) {
      const row = seatLabels[Math.floor((i - 1) / 5)];
      const seatNum = `${row}${((i - 1) % 5) + 1}`;
      seats.push({
        hall_id: hallId,
        seat_number: seatNum,
        is_booked: false,
      });
    }
  }

  await knex('seats').insert(seats);
}
