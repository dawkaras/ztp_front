/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const SingleSeriesPage = lazyLoad(
  () => import('./index'),
  module => module.SingleSeriesPage,
);
