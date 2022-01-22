/**
 * Asynchronously loads the component for ReviewPage
 */

import { lazyLoad } from 'utils/loadable';

export const EpisodeReviewPage = lazyLoad(
  () => import('./index'),
  module => module.EpisodeReviewPage,
);
