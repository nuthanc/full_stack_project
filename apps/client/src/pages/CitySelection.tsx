import React from 'react';
import { useNavigate } from 'react-router-dom';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

const CitySelection: React.FC = () => {
  const navigate = useNavigate();

  const handleCitySelect = (city: string) => {
    // Optionally save selected city in state (e.g., via context or query params)
    navigate('/select-movie');
  };

  return (
    <div>
      <h1>Select City</h1>
      <ul>
        {cities.map((city) => (
          <li key={city}>
            <button onClick={() => handleCitySelect(city)}>{city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelection;
