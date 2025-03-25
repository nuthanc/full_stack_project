import React, { useEffect, useState } from 'react';

interface Booking {
  id: number;
  details: string;
}

const BookingDetails: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Replace with an API call to fetch booking details for the logged-in user
    setBookings([
      { id: 1, details: 'Booking 1 details' },
      { id: 2, details: 'Booking 2 details' },
    ]);
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>{booking.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookingDetails;
