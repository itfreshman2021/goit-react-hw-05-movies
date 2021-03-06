import { useState, useEffect } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/getmovieswithaxios';

import s from './MovieDetailsPage.module.css';

const initialMovieDetails = {
  title: '',
  poster_path: '',
  vote_average: '',
  overview: '',
  genres: [],
  release_date: '',
};

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(initialMovieDetails);

  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    getMovieDetails(movieId)
      .then(data => !cancelled && setMovie(data))
      .catch(Error);

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  const { poster_path, title, release_date, vote_average, overview, genres } = movie;
  return (
    <>
      <button
        type="button"
        onClick={() => navigate(location?.state?.from ?? '/')}
        className={s.MovieDetailsButton}
      >
        Go back
      </button>

      <div className={s.MovieDetailsPage}>
        {!poster_path && <p> Poster not found</p>}
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className={s.MovieImg}
          />
        )}
        <div className={s.MovieInformations}>
          <h2 className={s.MovieTitle}>
            {title} (<span className={s.MovieDate}>{release_date.slice(0, 4)}</span>)
          </h2>
          <p className={s.MovieRate}>
            User Score: <span className={s.MovieRateSpan}>{vote_average * 10}%</span>
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul className={s.GenresList}>
            {genres.map(({ id, name }) => (
              <li key={id} className={s.GenresItem}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.MovieDetailsPageAdditional}>
        <p>Additional information</p>
        <ul className={s.additionalList}>
          <li className={s.additionalListItem}>
            <Link
              state={location?.state && { from: location.state.from }}
              to={`cast`}
              className={s.additionalListItemLink}
            >
              Cast
            </Link>
          </li>

          <li className={s.additionalListItem}>
            <Link
              state={location?.state && { from: location.state.from }}
              to={`reviews`}
              className={s.additionalListItemLink}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
