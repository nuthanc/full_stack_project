import React, { useEffect, useState } from 'react';

interface Hall {
  id: number;
  name: string;
}

const HallManagement: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [newHall, setNewHall] = useState('');

  useEffect(() => {
    // Fetch halls from your API
    setHalls([
      { id: 1, name: 'Hall 1' },
      { id: 2, name: 'Hall 2' },
    ]);
  }, []);

  const handleAddHall = () => {
    // Call API to add a new hall; here we update the local state for demo purposes
    const hall = { id: halls.length + 1, name: newHall };
    setHalls([...halls, hall]);
    setNewHall('');
  };

  return (
    <div>
      <h1>Manage Halls</h1>
      <ul>
        {halls.map((hall) => (
          <li key={hall.id}>{hall.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Hall Name"
        value={newHall}
        onChange={(e) => setNewHall(e.target.value)}
      />
      <button onClick={handleAddHall}>Add Hall</button>
    </div>
  );
};

export default HallManagement;
