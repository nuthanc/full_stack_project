import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addTheatre } from '../../api/api';

interface Theatre {
  id: number;
  name: string;
}

const TheatreManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTheatre, setNewTheatre] = useState('');

  const {
    data: theatres,
    isLoading,
    isError,
  } = useQuery<Theatre[]>({
    queryKey: ['adminTheatres'],
    queryFn: async () => {
      // Replace with an API call
      return [
        { id: 1, name: 'Theatre 1' },
        { id: 2, name: 'Theatre 2' },
      ];
    },
    staleTime: 5 * 60 * 1000,
  });


  const mutation = useMutation({
    mutationFn: () => addTheatre({ name: newTheatre }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTheatres'] });
      setNewTheatre('');
    },
    onError: (error: any) => {
      console.error('Failed to add theatre:', error);
    },
  });


  const handleAddTheatre = () => {
    if (newTheatre.trim()) {
      mutation.mutate();
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Manage Theatres</h1>
      {isLoading && <p>Loading theatres...</p>}
      {isError && <p className="text-red-500">Error loading theatres.</p>}
      <ul className="mb-6 space-y-2">
        {theatres?.map((theatre) => (
          <li key={theatre.id} className="p-4 bg-white rounded shadow">
            {theatre.name}
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="New Theatre Name"
          value={newTheatre}
          onChange={(e) => setNewTheatre(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddTheatre}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {mutation.status === 'pending' ? 'Adding...' : 'Add Theatre'}
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-2 text-red-500">Failed to add theatre.</p>
      )}
    </div>
  );
};

export default TheatreManagement;
