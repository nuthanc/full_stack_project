import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/booking-details');
  };

  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>Your booking has been confirmed!</p>
      <button onClick={handleViewDetails}>View Booking Details</button>
    </div>
  );
};

export default BookingConfirmation;
