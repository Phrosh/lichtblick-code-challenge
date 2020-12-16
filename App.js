import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductListItem from "./components/ProductListItem";
import { Badge, FAB, Provider as PaperProvider } from 'react-native-paper';
import styled from "styled-components/native";

const Container = styled.View`
  padding-top: 22px;
  height: 100%;
`;

const products = [
    {
        id: 1,
        name: 'Squeedly-Spooch',
        description: 'Humans do not have these',
        price: 12.99,
    },
    {
        id: 2,
        name: 'Ancient Psychic War Elephant',
        description: 'Best war elephant on the market',
        price: 23.33,
    },
    {
        id: 3,
        name: 'Popcorn',
        description: 'Hurray',
        price: 5,
    },
    {
        id: 4,
        name: 'More Popcorn',
        description: 'More Hurray',
        price: 7.00,
    },
    null,
]

export default function App() {
    // cart is an object: {id: {product, amount}, id: ...}
    const [cart, setCart] = useState({});

    const addToCart = (item, amount) => {
        // either adds a new cart item or changes the "amount" value of existing entries
        if (!item) return;
        const newAmount = (cart[item.id] ? cart[item.id].amount : 0) + amount;
        setCart(old => {
            const newCart = { ...old };
            newCart[item.id] = {
                amount: Math.max(0, newAmount),
                item
            };
            return newCart;
        });
    }

    return (
        <PaperProvider style={ styles.container }>
            <Container>
                <FlatList data={ products } keyExtractor={ item => item ? `${item.id}` : "0" }
                          renderItem={ ({ item }) => item ? <ProductListItem
                              addToCart={ addToCart }
                              amount={ cart[item.id] ? cart[item.id].amount : 0 }
                              product={ item }/> : <View style={ { height: 64 } }/> }/>
                <View style={ { position: 'absolute', right: 10, bottom: 10 } }>
                    <View style={ { zIndex: 38 } }>
                        <FAB icon="cart"/>
                    </View>
                    <Badge style={ {
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: 40
                    } }>
                        { Object.values(cart).reduce((prev, curr) => prev + curr.amount, 0) }
                    </Badge>
                </View>
            </Container>
            <StatusBar style="auto"/>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
