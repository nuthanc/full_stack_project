import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
}

const MovieSelection: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with an API call to fetch movies for the selected city
    setMovies([
      { id: 1, title: 'Movie A' },
      { id: 2, title: 'Movie B' },
    ]);
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    // Optionally save selected movie in state
    navigate('/select-theatre');
  };

  return (
    <div>
      <h1>Select Movie</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <button onClick={() => handleMovieSelect(movie)}>
              {movie.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSelection;
