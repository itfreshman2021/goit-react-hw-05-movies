import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b393a9d3a716a9f05d92b726c6afd07c';

const configAxios = axios.create({ baseURL: BASE_URL });
const getListMovies = res => res.data.results.map(({ title, id }) => ({ title, id }));

export const getTrendingMovies = () =>
  configAxios.get(`/trending/movie/week?api_key=${API_KEY}&limit=20`).then(getListMovies);

export const getMovieDetails = movieId =>
  configAxios
    .get(`/movie/${movieId}?api_key=${API_KEY}`)
    .then(res => res.data)
    .then(({ title, poster_path, vote_average, overview, genres, release_date }) => ({
      title,
      poster_path,
      vote_average,
      overview,
      genres,
      release_date,
    }));

export const getCastData = movieId =>
  configAxios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`).then(res =>
    res.data.cast.map(({ id, profile_path, original_name, character }) => ({
      id,
      profile_path,
      original_name,
      character,
    })),
  );

export const getReviewsData = movieId =>
  configAxios
    .get(`movie/${movieId}/reviews?api_key=${API_KEY}`)
    .then(res => res.data.results.map(({ id, author, content }) => ({ id, author, content })));

export const getMoviesSearch = query =>
  configAxios.get(`/search/movie?api_key=${API_KEY}&limit=20&query=${query}`).then(getListMovies);
