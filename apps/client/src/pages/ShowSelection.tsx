import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useQuery } from '@tanstack/react-query';
import { fetchShows } from '../api/api';

interface Show {
  id: number;
  time: string;
}

const ShowSelection: React.FC = () => {
  const navigate = useNavigate();
  const { theatre, movie, setShow } = useBooking();

  useEffect(() => {
    if (!theatre || !movie) {
      navigate('/select-theatre');
    }
  }, [theatre, movie, navigate]);

  const {
    data: shows,
    isLoading,
    isError,
  } = useQuery<Show[]>({
    queryKey: ['shows', theatre?.id, movie?.id],
    queryFn: () => fetchShows(theatre!.id, movie!.id),
    enabled: !!theatre && !!movie,
    staleTime: 5 * 60 * 1000,
  });


  const handleShowSelect = (show: Show) => {
    setShow(show);
    navigate('/select-seat');
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading shows...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading shows.
      </div>
    );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select Show</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {shows?.map((show: Show) => (
          <button
            key={show.id}
            onClick={() => handleShowSelect(show)}
            className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {show.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowSelection;
