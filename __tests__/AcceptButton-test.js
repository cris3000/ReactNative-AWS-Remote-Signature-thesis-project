// __tests__/Fingerprint-page-test.js
import 'react-native';
import React from 'react';
import AcceptButton from '../src/components/screens/AcceptButton';
import Firebase from 'react-native-firebase';

import renderer from 'react-test-renderer';
// Testing whether screen renders
it('renders correctly', () => {
  const tree = renderer.create(
    <AcceptButton />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
