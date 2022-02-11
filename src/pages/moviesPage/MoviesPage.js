import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { getMoviesSearch } from '../../services/getmovieswithaxios';
import s from './MoviesPage.module.css';

const initialMovies = [];

const MoviesPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [query, setQuery] = useState('');
  const [searchName, setSearchName] = useState('');
  const location = useLocation();

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
    setSearchName(query);
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
            <Link
              state={{ from: location }}
              to={{
                pathname: `${id}`,
                search: `query=${searchName}`,
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};

export default MoviesPage;
