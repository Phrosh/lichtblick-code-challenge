import React from 'react';
import { Text, View } from 'react-native';
import { Card } from "react-native-paper";
import PlusMinus from "../PlusMinus";
import { Price } from "./style";

const renderPrice = value => {
    if (Number.isInteger(value)) return value;
    return value.toFixed(2);
}

const ProductListItem = props => {
    if (!props.product) return null;

    return <Card elevation={ 8 } style={ { marginHorizontal: 12, marginVertical: 8, maxWidth: '100%', flex: 1 } }>
        <Card.Title title={ props.product.name }/>
        <Card.Content>
            <Text>{ props.product.description }</Text>
            <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                <View style={ { flex: 2 } }>
                    <Price>${ renderPrice(props.product.price) }</Price>
                </View>
                <PlusMinus amount={ props.amount } onPlus={ () => props.addToCart(props.product, 1) }
                           onMinus={ () => props.addToCart(props.product, -1) }/>
            </View>
        </Card.Content>
    </Card>
};

export default ProductListItem;
