import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Theatre {
  id: number;
  name: string;
}

const TheatreSelection: React.FC = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with an API call to fetch theatres for the selected movie and city
    setTheatres([
      { id: 1, name: 'Theatre 1' },
      { id: 2, name: 'Theatre 2' },
    ]);
  }, []);

  const handleTheatreSelect = (theatre: Theatre) => {
    // Optionally save selected theatre in state
    navigate('/select-show');
  };

  return (
    <div>
      <h1>Select Theatre</h1>
      <ul>
        {theatres.map((theatre) => (
          <li key={theatre.id}>
            <button onClick={() => handleTheatreSelect(theatre)}>
              {theatre.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheatreSelection;
