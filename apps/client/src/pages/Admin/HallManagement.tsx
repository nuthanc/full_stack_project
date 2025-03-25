import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addHall } from '../../api/api';

interface Hall {
  id: number;
  name: string;
}

const HallManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [newHall, setNewHall] = useState('');

  const {
    data: halls,
    isLoading,
    isError,
  } = useQuery<Hall[]>({
    queryKey: ['adminHalls'],
    queryFn: async () => {
      // Replace with an API call
      return [
        { id: 1, name: 'Hall 1' },
        { id: 2, name: 'Hall 2' },
      ];
    },
    staleTime: 5 * 60 * 1000,
  });


  const mutation = useMutation({
    mutationFn: () => addHall({ name: newHall }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminHalls'] });
      setNewHall('');
    },
    onError: (error: any) => {
      console.error('Failed to add hall:', error);
    },
  });


  const handleAddHall = () => {
    if (newHall.trim()) {
      mutation.mutate();
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Manage Halls</h1>
      {isLoading && <p>Loading halls...</p>}
      {isError && <p className="text-red-500">Error loading halls.</p>}
      <ul className="mb-6 space-y-2">
        {halls?.map((hall) => (
          <li key={hall.id} className="p-4 bg-white rounded shadow">
            {hall.name}
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="New Hall Name"
          value={newHall}
          onChange={(e) => setNewHall(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddHall}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {mutation.status === 'pending' ? 'Adding...' : 'Add Hall'}
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-2 text-red-500">Failed to add hall.</p>
      )}
    </div>
  );
};

export default HallManagement;
