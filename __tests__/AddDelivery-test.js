// __tests__/Fingerprint-page-test.js
import 'react-native';
import React from 'react';
import AddDelivery from '../src/components/screens/AddDelivery';

import renderer from 'react-test-renderer';
// Testing whether screen renders
it('renders correctly', () => {
  const tree = renderer.create(
    <AddDelivery />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});