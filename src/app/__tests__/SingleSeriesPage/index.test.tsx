import * as React from 'react';
import renderer from 'react-test-renderer';
import { SingleSeriesPage } from 'app/pages/SingleSeriesPage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders SingleSeriesPage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/series/0']}>
        <Route path="/series/:id">
          <SingleSeriesPage />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
