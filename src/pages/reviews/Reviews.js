import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsData } from '../../services/getmovieswithaxios';
import s from './Reviews.module.css';

const initialReviews = [];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const { movieId } = useParams();

  useEffect(() => {
    let cancelled = false;
    getReviewsData(movieId)
      .then(data => !cancelled && setReviews(data))
      .catch(Error);

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return (
    <>
      {!reviews.length && <p>We don't have any reviews for this movie</p>}
      {reviews.length > 0 && (
        <ul className={s.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li className={s.reviewsListItem} key={id}>
              <p className={s.MovieRate}>
                Author: <span className={s.MovieRateSpan}>{author}</span>
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
