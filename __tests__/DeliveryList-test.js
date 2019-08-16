// __tests__/Fingerprint-page-test.js
import 'react-native';
import React from 'react';
import DeliveryList from '../src/components/screens/DeliveryList';

import renderer from 'react-test-renderer';
// Testing whether screen renders
it('renders correctly', () => {
  const tree = renderer.create(
    <DeliveryList />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});