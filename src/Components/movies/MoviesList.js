import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MoviesList.module.css';

const MoviesList = ({ movies, location }) => {
  return (
    <>
      <ul className={s.moviesList}>
        {movies.map(({ id, title }) => (
          <li className={s.moviesListItem} key={id}>
            <Link
              className={s.moviesListItemLink}
              state={{ from: location }}
              to={{
                pathname: `${id}`,
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

MoviesList.propTypes = {
  location: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};
export default MoviesList;
