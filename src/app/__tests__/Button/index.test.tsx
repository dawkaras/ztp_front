import * as React from 'react';
import renderer from 'react-test-renderer';
import Button from 'app/components/Button';

it('renders Button component', () => {
  const component = renderer.create(<Button text="Test1" />).toJSON();
  expect(component).toMatchSnapshot();
});
it('renders Button component', () => {
  const component = renderer.create(<Button text="Test2" />).toJSON();
  expect(component).toMatchSnapshot();
});
