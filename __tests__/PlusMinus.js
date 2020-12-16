import React from 'react';
import 'react-native';
import 'jest-enzyme';
import { mount } from 'enzyme';
import PlusMinus from '../components/PlusMinus';
import '../jestSetup';

describe('PlusMinus',  () => {
    it('displays the correct initial value', () => {
        let wrapper = mount(<PlusMinus amount={0} />);
        expect(wrapper.text()).toBe('0');

        wrapper = mount(<PlusMinus amount={4} />);
        expect(wrapper.text()).toBe('4');
    });
});
