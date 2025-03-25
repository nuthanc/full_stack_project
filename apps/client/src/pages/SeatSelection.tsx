import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Seat {
  number: string;
  available: boolean;
}

const SeatSelection: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const navigate = useNavigate();

  // Replace with an API call to fetch the seat layout for the selected show
  const seats: Seat[] = Array.from({ length: 30 }, (_, i) => ({
    number: `${i + 1}`,
    available: true,
  }));

  const toggleSeat = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleBooking = () => {
    // Optionally call an API to reserve the seats before payment
    navigate('/payment');
  };

  return (
    <div>
      <h1>Select Seats</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 300 }}>
        {seats.map((seat) => (
          <button
            key={seat.number}
            onClick={() => toggleSeat(seat.number)}
            disabled={!seat.available}
            style={{
              margin: 5,
              backgroundColor: selectedSeats.includes(seat.number)
                ? 'green'
                : undefined,
            }}
          >
            {seat.number}
          </button>
        ))}
      </div>
      <button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default SeatSelection;
