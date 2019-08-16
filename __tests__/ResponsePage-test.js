// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import ResponsePage from '../src/components/screens/ResponsePage';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <ResponsePage />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});