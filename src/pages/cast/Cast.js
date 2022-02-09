import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCastData } from '../../services/getmovieswithaxios';
import s from './Cast.module.css';

const initialCast = [];

const Cast = () => {
  const [casts, setCasts] = useState(initialCast);
  const { movieId } = useParams();
  useEffect(() => {
    let cancelled = false;
    getCastData(movieId)
      .then(data => !cancelled && setCasts(data))
      .catch(Error);

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return (
    <>
      {!casts.length && <p> Casts not found</p>}
      {casts.length > 0 && (
        <ul className="castList">
          {casts.map(({ id, profile_path, original_name, character }) => (
            <li className="castListItem" key={id}>
              {profile_path && (
                <img
                  src={profile_path && `https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={original_name}
                  className={s.CastImg}
                />
              )}
              {!profile_path && <p> Photo not found</p>}
              <p>{original_name}</p>
              <p className={s.MovieRate}>
                Character: <span className={s.MovieRateSpan}>{character}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Cast;
