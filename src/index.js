import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
// import HomePage from './pages/homePage/HomePage';
// import MoviesPage from './pages/moviesPage/MoviesPage';
// import DefaultPage from './pages/defaultPage/DefaultPage';
// import MovieDetailsPage from './pages/movieDetailsPage/MovieDetailsPage';
// import Cast from './pages/cast/Cast';
// import Reviews from './pages/reviews/Reviews';

const HomePage = lazy(() =>
  import('./pages/homePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/moviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const DefaultPage = lazy(() =>
  import('./pages/defaultPage/DefaultPage' /* webpackChunkName: "default-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('./pages/movieDetailsPage/MovieDetailsPage' /* webpackChunkName: "moviesdetails-page" */),
);
const Cast = lazy(() => import('./pages/cast/Cast' /* webpackChunkName: "cast-page" */));
const Reviews = lazy(() =>
  import('./pages/reviews/Reviews' /* webpackChunkName: "rewiews-page" */),
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<h2>...loading</h2>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="movies">
              <Route index element={<MoviesPage />} />
              <Route path=":movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<Cast />}></Route>
                <Route path="reviews" element={<Reviews />}></Route>
              </Route>
            </Route>

            <Route path="*" element={<DefaultPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
