import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutAnimation, UIManager, View } from "react-native";
import { FAB, IconButton } from "react-native-paper";
import { AmountContainer } from "./style";
import * as Animatable from 'react-native-animatable';

const PlusMinus = props => {
    // button animation stuff
    const buttonMargin = props.amount === 0 ? -48 : -14;
    const plusSmall = props.amount !== 0;
    const plusMargin = props.amount === 0 ? -4 : 0;
    const plusRotation = useRef(new Animated.Value(0)).current;
    const plusSpin = plusRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    });

    const amountContainerSize = props.amount === 0 ? 54 : 64;

    // ref to our value-text
    const textRef = useRef(null);

    // I want the new value to be displayed while the animation is still playing, so we can not simply work with the prop
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        // needed for LayoutAnimation
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);

    useEffect(() => {
        setAmount(props.amount);
    }, []);

    useEffect(() => {
        // rotation animation when props.amount changes
        Animated.timing(plusRotation, {
            toValue: props.amount === 0 ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();

        // rubber band animation
        if (textRef.current) {
            // display the new value after 200ms, while the animation
            setTimeout(() => setAmount(props.amount), 200);
            textRef.current.rubberBand();
        }
    }, [props.amount]);

    return <View style={ { flex: 1, flexDirection: 'row', justifyContent: 'center' } }>
        <View style={ { justifyContent: 'center', zIndex: 8 } }>
            <IconButton
                icon="minus"
                animated
                size={ 28 }
                style={ { borderColor: '#cccccc', borderWidth: 2, margin: 0, backgroundColor: '#ffffff' } }
                onPress={ () => {
                    // position shifts and sizes can be easily made with LayoutAnimation
                    LayoutAnimation.easeInEaseOut();
                    props.onMinus();
                } }
            />
        </View>
        <View style={ { marginLeft: buttonMargin, marginRight: buttonMargin, height: 64, justifyContent: 'center' } }>
            <AmountContainer style={ { height: amountContainerSize, width: amountContainerSize } }>
                <Animatable.Text ref={ textRef } style={ { fontSize: 24 } }>
                    { amount }
                </Animatable.Text>
            </AmountContainer>
        </View>
        <Animated.View
            style={ { justifyContent: 'center', zIndex: 10, margin: plusMargin, transform: [{ rotate: plusSpin }] } }>
            <FAB
                small={ plusSmall }
                icon="plus"
                animated
                onPress={ () => {
                    LayoutAnimation.easeInEaseOut();
                    props.onPlus();
                } }
            />
        </Animated.View>
    </View>
};

export default PlusMinus;
