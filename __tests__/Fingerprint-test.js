// __tests__/Fingerprint-page-test.js
import 'react-native';
import React from 'react';
import Fingerprint from '../src/components/screens/Fingerprint';

import renderer from 'react-test-renderer';
// Testing whether screen renders
it('renders correctly', () => {
  const tree = renderer.create(
    <Fingerprint />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});