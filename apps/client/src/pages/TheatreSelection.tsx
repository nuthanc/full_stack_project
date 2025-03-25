import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useQuery } from '@tanstack/react-query';
import { fetchTheatres } from '../api/api';

interface Theatre {
  id: number;
  name: string;
}

const TheatreSelection: React.FC = () => {
  const navigate = useNavigate();
  const { city, movie, setTheatre } = useBooking();

  useEffect(() => {
    if (!city || !movie) {
      navigate('/select-city');
    }
  }, [city, movie, navigate]);

  const {
    data: theatres,
    isLoading,
    isError,
  } = useQuery<Theatre[]>({
    queryKey: ['theatres', city, movie?.id],
    queryFn: () => fetchTheatres(city!, movie.id),
    enabled: !!city && !!movie,
    staleTime: 5 * 60 * 1000,
  });

  const handleTheatreSelect = (theatre: Theatre) => {
    setTheatre(theatre);
    navigate('/select-show');
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading theatres...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading theatres.
      </div>
    );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select Theatre</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {theatres?.map((theatre: Theatre) => (
          <div key={theatre.id} className="p-4 bg-white rounded shadow">
            <h2 className="mb-2 text-xl font-semibold">{theatre.name}</h2>
            <button
              onClick={() => handleTheatreSelect(theatre)}
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

export default TheatreSelection;
