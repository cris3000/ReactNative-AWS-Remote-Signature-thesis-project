// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import HomeScreenDelivery from '../src/components/screens/HomeScreenDelivery';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <HomeScreenDelivery />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});