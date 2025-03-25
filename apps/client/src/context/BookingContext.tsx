import React, { createContext, useState, useContext } from 'react';

interface BookingContextType {
  city?: string;
  setCity: (city: string) => void;
  movie?: any;
  setMovie: (movie: any) => void;
  theatre?: any;
  setTheatre: (theatre: any) => void;
  show?: any;
  setShow: (show: any) => void;
  seats: string[];
  setSeats: (seats: string[]) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string | undefined>(undefined);
  const [movie, setMovie] = useState<any>(undefined);
  const [theatre, setTheatre] = useState<any>(undefined);
  const [show, setShow] = useState<any>(undefined);
  const [seats, setSeats] = useState<string[]>([]);

  return (
    <BookingContext.Provider
      value={{
        city,
        setCity,
        movie,
        setMovie,
        theatre,
        setTheatre,
        show,
        setShow,
        seats,
        setSeats,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error('useBooking must be used within a BookingProvider');
  return context;
};
