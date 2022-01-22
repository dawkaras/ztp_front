import * as React from 'react';
import renderer from 'react-test-renderer';
import { EpisodeReviewPage } from 'app/pages/EpisodeReviewPage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders EpisodeReviewPage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/episodeReview/0']}>
        <Route path="/episodeReview/:id">
          <EpisodeReviewPage
            props={{
              title: 'Test1Title',
              seriesTitle: 'Test1SeriesTitle',
              seasonNumber: 'Test1SeasonNumber',
              episodeId: 'Test1EpisodeId',
            }}
          />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
