import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
}

const MovieManagement: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState('');

  useEffect(() => {
    // Fetch movies from your API
    setMovies([
      { id: 1, title: 'Movie A' },
      { id: 2, title: 'Movie B' },
    ]);
  }, []);

  const handleAddMovie = () => {
    // Call API to add a new movie; here we update the local state for demo purposes
    const movie = { id: movies.length + 1, title: newMovie };
    setMovies([...movies, movie]);
    setNewMovie('');
  };

  return (
    <div>
      <h1>Manage Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Movie Title"
        value={newMovie}
        onChange={(e) => setNewMovie(e.target.value)}
      />
      <button onClick={handleAddMovie}>Add Movie</button>
    </div>
  );
};

export default MovieManagement;
