/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { LoginPage } from './pages/LoginPage/Loadable';
import { MovieReviewPage } from './pages/MovieReviewPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { MoviesPage } from './pages/MoviesPage';
import { SeriesPage } from './pages/SeriesPage';
import { MoviePage } from './pages/MoviePage';
import { SingleSeriesPage } from './pages/SingleSeriesPage';
import { SeasonsPage } from './pages/SeasonsPage';
import { SeasonPage } from './pages/SeasonPage';
import { EpisodesPage } from './pages/EpisodesPage';
import { EpisodePage } from './pages/EpisodePage';
import { RegisterPage } from './pages/RegisterPage';
import { SeriesReviewPage } from './pages/SeriesReviewPage';
import { SeasonReviewPage } from './pages/SeasonReviewPage';
import { EpisodeReviewPage } from './pages/EpisodeReviewPage';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <NavBar />
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/movieReview/:id" component={MovieReviewPage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route exact path="/movie/:id" component={MoviePage} />
        <Route exact path="/seriesReview/:id" component={SeriesReviewPage} />
        <Route exact path="/series" component={SeriesPage} />
        <Route exact path="/series/:id" component={SingleSeriesPage} />
        <Route exact path="/seasonReview/:id" component={SeasonReviewPage} />
        <Route exact path="/seasons" component={SeasonsPage} />
        <Route exact path="/season/:id" component={SeasonPage} />
        <Route exact path="/episodeReview/:id" component={EpisodeReviewPage} />
        <Route exact path="/episodes" component={EpisodesPage} />
        <Route exact path="/episode/:id" component={EpisodePage} />
        <Route component={LoginPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </BrowserRouter>
  );
}
