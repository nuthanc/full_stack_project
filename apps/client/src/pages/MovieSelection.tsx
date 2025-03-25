import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/api';

interface Movie {
  id: number;
  title: string;
}

const MovieSelection: React.FC = () => {
  const navigate = useNavigate();
  const { city, setMovie } = useBooking();

  useEffect(() => {
    if (!city) {
      navigate('/select-city');
    }
  }, [city, navigate]);

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ['movies', city],
    queryFn: () => fetchMovies(city!),
    enabled: !!city,
    staleTime: 5 * 60 * 1000,
  });

  const handleMovieSelect = (movie: Movie) => {
    setMovie(movie);
    navigate('/select-theatre');
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading movies...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading movies.
      </div>
    );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select Movie</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {movies?.map((movie: Movie) => (
          <div key={movie.id} className="p-4 bg-white rounded shadow">
            <h2 className="mb-2 text-xl font-semibold">{movie.title}</h2>
            <button
              onClick={() => handleMovieSelect(movie)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSelection;
