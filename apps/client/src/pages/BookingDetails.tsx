import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBookingDetails } from '../api/api';

interface Booking {
  id: number;
  details: string;
}

const BookingDetails: React.FC = () => {
  // In production, fetch the user ID from auth context or secure storage
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery<Booking[]>({
    queryKey: ['bookings', 1],
    queryFn: () => fetchBookingDetails(1),
    staleTime: 5 * 60 * 1000,
  });


  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading booking details...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading booking details.
      </div>
    );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Your Bookings</h1>
      <ul className="space-y-4">
        {bookings?.map((booking: Booking) => (
          <li key={booking.id} className="p-4 bg-white rounded shadow">
            {booking.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingDetails;
