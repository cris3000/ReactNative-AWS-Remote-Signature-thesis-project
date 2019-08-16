// __tests__/Map-page-test.js
import 'react-native';
import React from 'react';
import Map from '../src/components/screens/Map';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
    <Map />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});