/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const EpisodesPage = lazyLoad(
  () => import('./index'),
  module => module.EpisodesPage,
);
