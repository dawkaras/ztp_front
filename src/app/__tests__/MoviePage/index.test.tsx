import * as React from 'react';
import renderer from 'react-test-renderer';
import { MoviePage } from 'app/pages/MoviePage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders MoviePage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/movie/0']}>
        <Route path="/movie/:id">
          <MoviePage />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
