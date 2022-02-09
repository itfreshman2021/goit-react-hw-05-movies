import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { getMoviesSearch } from '../../services/getmovieswithaxios';
import s from './MoviesPage.module.css';

const initialMovies = [];

const MoviesPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [query, setQuery] = useState('');

  const handleSearchNameChange = event => {
    const { value } = event.target;
    setQuery(value);
  };

  const HandleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return;
    }
    getMoviesSearch(query)
      .then(data => setMovies(data))
      .catch(() => {
        alert('Sorry! Please try again.');
      });

    setQuery('');
  };

  return (
    <>
      <form className={s.SearchForm} onSubmit={HandleSubmit}>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleSearchNameChange}
        />
        <button type="submit" className={s.SearchFormButton}>
          Search
        </button>
      </form>
      <ul className={s.moviesList}>
        {movies.map(({ id, title }) => (
          <li className={s.moviesListItem} key={id}>
            <Link to={`${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};

export default MoviesPage;
