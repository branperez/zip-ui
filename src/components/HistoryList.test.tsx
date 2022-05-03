import React from 'react';
import { render, screen } from '@testing-library/react';
import HistoryList from './HistoryList';
import { History } from '../types';
import renderer from 'react-test-renderer';

it('correctly renders History -- admittedly a pretty weeak test', () => {
    const item: History = { postCode: '70119', city: 'New Orleans', state: 'Louisiana', timeStamp: 0 }
    const history = [ item ]
    const component = renderer.create(
        <HistoryList previous={history} />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
