import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchSeats, reserveSeats } from '../api/api';

interface Seat {
  number: string;
  available: boolean;
}

const SeatSelection: React.FC = () => {
  const navigate = useNavigate();
  const { show, seats, setSeats } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState<string[]>(seats || []);

  useEffect(() => {
    if (!show) {
      navigate('/select-show');
    }
  }, [show, navigate]);

  const {
    data: seatData,
    isLoading,
    isError,
  } = useQuery<Seat[]>({
    queryKey: ['seats', show?.id],
    queryFn: () => fetchSeats(show!.id),
    enabled: !!show,
    staleTime: 5 * 60 * 1000,
  });


  const mutation = useMutation<any, Error, void>({
    mutationFn: () => reserveSeats(show!.id, selectedSeats),
    onSuccess: () => {
      setSeats(selectedSeats);
      navigate('/payment');
    },
    onError: (error: Error) => {
      console.error('Reservation failed:', error);
    },
  });


  const toggleSeat = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;
    mutation.mutate();
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading seats...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading seats.
      </div>
    );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select Seats</h1>
      <div className="grid grid-cols-6 gap-4 justify-items-center">
        {seatData?.map((seat: Seat) => (
          <button
            key={seat.number}
            onClick={() => toggleSeat(seat.number)}
            disabled={!seat.available}
            className={`w-12 h-12 border rounded ${
              selectedSeats.includes(seat.number)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            } ${!seat.available && 'opacity-50 cursor-not-allowed'}`}
          >
            {seat.number}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0 || mutation.status === 'pending'}
          className="px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {mutation.status === 'pending'
            ? 'Reserving...'
            : 'Proceed to Payment'}
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-4 text-center text-red-500">
          Failed to reserve seats. Please try again.
        </p>
      )}
    </div>
  );
};

export default SeatSelection;
