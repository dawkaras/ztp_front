/**
 * Asynchronously loads the component for ReviewPage
 */

import { lazyLoad } from 'utils/loadable';

export const SeasonReviewPage = lazyLoad(
  () => import('./index'),
  module => module.SeasonReviewPage,
);
