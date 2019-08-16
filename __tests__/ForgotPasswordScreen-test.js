// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import ForgetPasswordScreen from '../src/components/screens/ForgetPasswordScreen';

import renderer from 'react-test-renderer';
// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <ForgetPasswordScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});