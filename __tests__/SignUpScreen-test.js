// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import SignUpScreen from '../src/components/screens/SignUpScreen';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <SignUpScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});