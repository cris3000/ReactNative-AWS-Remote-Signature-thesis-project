// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import HomeScreen from '../src/components/screens/HomeScreen';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
 
    ).toJSON();
  expect(tree).toMatchSnapshot();
});