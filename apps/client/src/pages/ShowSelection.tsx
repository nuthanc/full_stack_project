import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Show {
  id: number;
  time: string;
}

const ShowSelection: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with an API call to fetch shows for the selected theatre/movie
    setShows([
      { id: 1, time: '10:00 AM' },
      { id: 2, time: '2:00 PM' },
      { id: 3, time: '6:00 PM' },
    ]);
  }, []);

  const handleShowSelect = (show: Show) => {
    // Optionally save selected show in state
    navigate('/select-seat');
  };

  return (
    <div>
      <h1>Select Show</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <button onClick={() => handleShowSelect(show)}>{show.time}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowSelection;
