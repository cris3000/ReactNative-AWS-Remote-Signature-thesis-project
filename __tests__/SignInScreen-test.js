// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import SignInScreen from '../src/components/screens/SignInScreen';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <SignInScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});