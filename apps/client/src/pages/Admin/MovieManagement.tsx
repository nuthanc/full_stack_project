import React, { useState } from 'react';
import { addMovie } from '../../api/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

interface Movie {
  id: number;
  title: string;
}

const MovieManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [newMovie, setNewMovie] = useState('');

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ['adminMovies'],
    queryFn: async () => {
      // Replace with an API call
      return [
        { id: 1, title: 'Movie A' },
        { id: 2, title: 'Movie B' },
      ];
    },
    staleTime: 5 * 60 * 1000,
  });


  const mutation = useMutation({
    mutationFn: () => addMovie({ title: newMovie }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMovies'] });
      setNewMovie('');
    },
    onError: (error: any) => {
      console.error('Failed to add movie:', error);
    },
  });


  const handleAddMovie = () => {
    if (newMovie.trim()) {
      mutation.mutate();
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Manage Movies</h1>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p className="text-red-500">Error loading movies.</p>}
      <ul className="mb-6 space-y-2">
        {movies?.map((movie) => (
          <li key={movie.id} className="p-4 bg-white rounded shadow">
            {movie.title}
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="New Movie Title"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddMovie}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {mutation.status === 'pending' ? 'Adding...' : 'Add Movie'}
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-2 text-red-500">Failed to add movie.</p>
      )}
    </div>
  );
};

export default MovieManagement;
