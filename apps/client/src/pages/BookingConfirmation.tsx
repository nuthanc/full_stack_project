import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/booking-details');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="mb-4 text-3xl font-bold">Booking Confirmation</h1>
      <p className="mb-8 text-lg">Your booking has been confirmed!</p>
      <button
        onClick={handleViewDetails}
        className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        View Booking Details
      </button>
    </div>
  );
};

export default BookingConfirmation;
