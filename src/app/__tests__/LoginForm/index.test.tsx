import * as React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from 'app/components/LoginForm';

it('renders LoginForm component', () => {
  const component = renderer
    .create(
      <LoginForm
        onSubmit={() => {
          alert('Test1');
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
it('renders LoginForm component', () => {
  const component = renderer
    .create(
      <LoginForm
        onSubmit={() => {
          alert('Test2');
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
