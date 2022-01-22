/**
 * Asynchronously loads the component for ReviewPage
 */

import { lazyLoad } from 'utils/loadable';

export const SeriesReviewPage = lazyLoad(
  () => import('./index'),
  module => module.SeriesReviewPage,
);
