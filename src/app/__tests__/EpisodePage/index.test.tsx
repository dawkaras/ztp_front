import * as React from 'react';
import renderer from 'react-test-renderer';
import { EpisodePage } from 'app/pages/EpisodePage';
import { MemoryRouter, Route } from 'react-router-dom';

it('renders EpisodePage page', () => {
  const component = renderer
    .create(
      <MemoryRouter initialEntries={['/episode/0']}>
        <Route path="/episode/:id">
          <EpisodePage />
        </Route>
      </MemoryRouter>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
