import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCities } from '../api/api';
import { useBooking } from '../context/BookingContext';

const CitySelection: React.FC = () => {
  const navigate = useNavigate();
  const { setCity } = useBooking();

  const {
    data: cities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    staleTime: 5 * 60 * 1000,
  });


  const handleCitySelect = (city: string) => {
    setCity(city);
    navigate('/select-movie');
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading cities...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading cities.
      </div>
    );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Select City</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {cities?.map((city) => (
          <button
            key={city.id}
            onClick={() => handleCitySelect(city.name)}
            className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySelection;
