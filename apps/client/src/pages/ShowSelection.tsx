import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchShows, Show } from '../api/api'; // Ensure you have the Show type in api.ts
import { useBooking } from '../context/BookingContext';

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

  const handleShowSelect = (selectedShow: Show) => {
    setShow(selectedShow);
    navigate('/select-seat');
  };

  // Simple date/time formatter
  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading shows...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading shows.
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select Show</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shows?.map((show) => (
          <div
            key={show.id}
            className="p-4 bg-white rounded shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                {show.movie?.title || 'Untitled Movie'}
              </h2>
              <p className="mb-2 text-sm text-gray-600">
                Hall: {show.hall?.name || 'Unknown Hall'}
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Start Time: {formatDateTime(show.start_time)}
              </p>
            </div>
            <button
              onClick={() => handleShowSelect(show)}
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

export default ShowSelection;
