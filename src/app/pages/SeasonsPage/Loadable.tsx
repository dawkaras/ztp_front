/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const SeasonsPage = lazyLoad(
  () => import('./index'),
  module => module.SeasonsPage,
);
