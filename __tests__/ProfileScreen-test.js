// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import ProfileScreen from '../src/components/screens/ProfileScreen';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <ProfileScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});