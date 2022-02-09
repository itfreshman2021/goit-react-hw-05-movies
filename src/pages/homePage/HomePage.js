import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../../services/getmovieswithaxios';
import s from './HomePage.module.css';

const initialMovies = [
  {
    id: '',
    title: '',
  },
];

const HomePage = () => {
  const [movies, setMovies] = useState(initialMovies);

  useEffect(() => {
    getTrendingMovies()
      .then(data => setMovies(data))
      .catch(() => {
        alert('Sorry! Please try again.');
      });
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      <ul className={s.moviesList}>
        {movies.map(movie => (
          <li className={s.moviesListItem} key={movie.id}>
            <Link className={s.moviesListItemLink} to={`movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
