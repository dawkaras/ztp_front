/**
 * Asynchronously loads the component for ReviewPage
 */

import { lazyLoad } from 'utils/loadable';

export const MovieReviewPage = lazyLoad(
  () => import('./index'),
  module => module.MovieReviewPage,
);
