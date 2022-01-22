/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const MoviesPage = lazyLoad(
  () => import('./index'),
  module => module.MoviesPage,
);
