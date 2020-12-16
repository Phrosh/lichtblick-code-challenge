import React from 'react';
import 'react-native';
import 'jest-enzyme';
import { shallow, mount } from 'enzyme';
import { FlatList } from "react-native";
import App from '../App';
import '../jestSetup';

describe('App.js',  () => {
    it('renders list', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(FlatList)).toHaveLength(1);
    });

    it('has all four test items', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find(FlatList).contains('Squeedly-Spooch')).toBeTruthy();
        expect(wrapper.find(FlatList).contains('Ancient Psychic War Elephant')).toBeTruthy();
        expect(wrapper.find(FlatList).contains('Popcorn')).toBeTruthy();
        expect(wrapper.find(FlatList).contains('More Popcorn')).toBeTruthy();
    });
});
