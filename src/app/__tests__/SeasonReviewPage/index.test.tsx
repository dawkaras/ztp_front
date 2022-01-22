import * as React from 'react';
import renderer from 'react-test-renderer';
import { SeasonReviewPage } from 'app/pages/SeasonReviewPage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders SeasonReviewPage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/seasonReview/0']}>
        <Route path="/seasonReview/:id">
          <SeasonReviewPage
            props={{
              series: 'Test1Series',
              number: 'Test1Number',
              seasonId: 'Test1SeasonId',
            }}
          />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
