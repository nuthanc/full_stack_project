import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useMutation } from '@tanstack/react-query';
import { processPayment } from '../api/api';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { show, seats } = useBooking();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    if (!show || seats.length === 0) {
      navigate('/select-seat');
    }
  }, [show, seats, navigate]);

  const mutation = useMutation({
    // booking id should be set properly
    mutationFn: () => processPayment(1, paymentDetails),
    onSuccess: () => {
      navigate('/booking-confirmation');
    },
    onError: (error: any) => {
      console.error('Payment failed:', error);
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Payment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={paymentDetails.cardNumber}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="expiry">
              Expiry Date
            </label>
            <input
              id="expiry"
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="MM/YY"
              value={paymentDetails.expiry}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, expiry: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold" htmlFor="cvv">
              CVV
            </label>
            <input
              id="cvv"
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={paymentDetails.cvv}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {mutation.status === 'pending' ? 'Processing...' : 'Pay Now'}
          </button>
          {mutation.isError && (
            <p className="mt-4 text-red-500">
              Payment failed. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Payment;
