import React from 'react';
import 'react-native';
import 'jest-enzyme';
import { mount } from 'enzyme';
import ProductListItem from '../components/ProductListItem';
import '../jestSetup';

const testProduct = {
    id: 666,
    name: 'Herp Derp',
    price: 77.7,
};

describe('ProductListItem',  () => {
    it('does not render empty items', () => {
        const wrapper = mount(<ProductListItem />);
        expect(wrapper.children()).toHaveLength(0);
    });

    it('renders test item name', () => {
        const wrapper = mount(<ProductListItem product={testProduct} />);
        expect(wrapper.contains('Herp Derp')).toBeTruthy();
    });

    it('renders price correctly', () => {
        let wrapper = mount(<ProductListItem product={testProduct} />);
        expect(wrapper.contains('77.70')).toBeTruthy();

        wrapper = mount(<ProductListItem product={ { ...testProduct, price: 12.345 }} />);
        expect(wrapper.contains('12.35')).toBeTruthy();

        wrapper = mount(<ProductListItem product={ { ...testProduct, price: 44 }} />);
        expect(wrapper.contains('44')).toBeTruthy();
        expect(wrapper.contains('44.')).toBeFalsy();
    });
});
