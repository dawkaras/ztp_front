import * as React from 'react';
import renderer from 'react-test-renderer';
import { SeriesReviewPage } from 'app/pages/SeriesReviewPage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders SeriesReviewPage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/seriesReview/0']}>
        <Route path="/seriesReview/:id">
          <SeriesReviewPage
            props={{ title: 'Test1Title', seriesId: 'Test1SeriesId' }}
          />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
