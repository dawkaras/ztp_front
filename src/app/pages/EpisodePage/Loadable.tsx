/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const EpisodePage = lazyLoad(
  () => import('./index'),
  module => module.EpisodePage,
);
