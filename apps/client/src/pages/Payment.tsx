import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Integrate with your payment gateway API here
    // After successful payment, navigate to confirmation
    navigate('/booking-confirmation');
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
