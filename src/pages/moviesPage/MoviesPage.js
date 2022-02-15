import { useState, useEffect } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { getMoviesSearch } from '../../services/getmovieswithaxios';
import MoviesList from '../../Components/movies/MoviesList';
import s from './MoviesPage.module.css';

const initialMovies = [];

const MoviesPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [query, setQuery] = useState('');
  // const [searchName, setSearchName] = useState('');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let searchName = searchParams.get('query');

    if (searchName) {
      getMoviesSearch(searchName)
        .then(data => setMovies(data))
        .catch(() => {
          alert('Sorry! Please try again.');
        });
    }
  }, [searchParams]);

  const handleSearchNameChange = event => {
    const { value } = event.target;
    setQuery(value);
  };

  const HandleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return;
    }

    setSearchParams(`query=${query}`);

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
      <MoviesList movies={movies} location={location} />

      <Outlet />
    </>
  );
};

export default MoviesPage;
