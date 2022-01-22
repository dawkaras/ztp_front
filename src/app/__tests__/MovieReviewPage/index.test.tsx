import * as React from 'react';
import renderer from 'react-test-renderer';
import { MovieReviewPage } from 'app/pages/MovieReviewPage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders MovieReviewPage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/movieReview/0']}>
        <Route path="/movieReview/:id">
          <MovieReviewPage
            props={{ title: 'Test1Title', movieId: 'Test1Id' }}
          />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
