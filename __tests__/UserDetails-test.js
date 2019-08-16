// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import UserDetails from '../src/components/screens/UserDetails';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
 <UserDetails />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});