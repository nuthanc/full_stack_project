import React, { useEffect, useState } from 'react';

interface Theatre {
  id: number;
  name: string;
}

const TheatreManagement: React.FC = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [newTheatre, setNewTheatre] = useState('');

  useEffect(() => {
    // Fetch theatres from your API
    setTheatres([
      { id: 1, name: 'Theatre 1' },
      { id: 2, name: 'Theatre 2' },
    ]);
  }, []);

  const handleAddTheatre = () => {
    // Call API to add a new theatre; here we update the local state for demo purposes
    const theatre = { id: theatres.length + 1, name: newTheatre };
    setTheatres([...theatres, theatre]);
    setNewTheatre('');
  };

  return (
    <div>
      <h1>Manage Theatres</h1>
      <ul>
        {theatres.map((theatre) => (
          <li key={theatre.id}>{theatre.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Theatre Name"
        value={newTheatre}
        onChange={(e) => setNewTheatre(e.target.value)}
      />
      <button onClick={handleAddTheatre}>Add Theatre</button>
    </div>
  );
};

export default TheatreManagement;
