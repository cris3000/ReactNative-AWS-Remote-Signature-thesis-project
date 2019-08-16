// __tests__/HomeScreen-page-test.js
import 'react-native';
import React from 'react';
import WelcomeScreen from '../src/components/screens/WelcomeScreen';

import renderer from 'react-test-renderer';

// Testing whether screen renders
test('renders correctly', () => {
  const tree = renderer.create(
   <WelcomeScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
