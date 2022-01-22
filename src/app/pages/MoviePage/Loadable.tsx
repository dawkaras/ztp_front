/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const MoviePage = lazyLoad(
  () => import('./index'),
  module => module.MoviePage,
);
