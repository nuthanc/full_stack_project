import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('movies').del();

  // Inserts seed entries
  await knex('movies').insert([
    {
      title: 'The Last Horizon',
      description:
        'A sci-fi epic about the survival of humanity on a distant planet.',
      duration: 142,
    },
    {
      title: 'Midnight Echoes',
      description: 'A noir thriller unraveling the secrets of a corrupt city.',
      duration: 118,
    },
    {
      title: 'Echoes of the Forest',
      description:
        'A heartfelt drama set in the wilderness of the Pacific Northwest.',
      duration: 105,
    },
    {
      title: 'Quantum Hearts',
      description: 'A romantic comedy with a time-travel twist.',
      duration: 97,
    },
    {
      title: 'Rise of the Phoenix',
      description: 'An underdog sports team rises to glory.',
      duration: 124,
    },
    {
      title: 'Neon Dreams',
      description: 'A cyberpunk action flick set in a dystopian future.',
      duration: 130,
    },
    {
      title: 'The Forgotten Sea',
      description:
        'A mystery unfolds on a remote island where nothing is as it seems.',
      duration: 113,
    },
    {
      title: 'Canvas of Fate',
      description: 'An aspiring painter discovers a magical brush.',
      duration: 100,
    },
    {
      title: 'Into the Abyss',
      description: 'A submarine crew faces unimaginable horrors in the deep.',
      duration: 110,
    },
    {
      title: 'Whispers in the Wind',
      description: 'An emotional tale of love, loss, and finding peace.',
      duration: 95,
    },
  ]);
}
