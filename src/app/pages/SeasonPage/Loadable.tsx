/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const SeasonPage = lazyLoad(
  () => import('./index'),
  module => module.SeasonPage,
);
