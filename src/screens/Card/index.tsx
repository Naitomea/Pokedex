import React, {useCallback, useEffect, useState} from 'react';
import {ColorValue, StatusBar, useWindowDimensions} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {RootStackScreenProps} from '../../navigation/types';
import Animated, {
  Extrapolation,
  SharedValue,
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import Summary from './Summary';
import Details from './Details';

import AnimatedBackground from '../../components/AnimatedBackground';

import {useAppSelector} from '../../store';
import {selectPokemon} from '../../store/reducers/pokemon';
import {getPokemonColor} from '../../utils';
import Block from '../../components/Block';
import Dots from '../../components/Dots';

import styles from './styles';

const CardScreen = ({navigation, route}: RootStackScreenProps<'Card'>) => {
  const {pokemonId} = route.params;
  const pokemon = useAppSelector(selectPokemon(pokemonId));

  //#region Background

  const color = getPokemonColor(pokemon);
  const animatedColor = useSharedValue(color);
  const [currentColor, setCurrentColor] = useState<
    ColorValue | SharedValue<string>
  >(color);

  const [isClosing, setIsClosing] = useState(false);
  const closingSwapColor = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    if (isClosing) {
      return;
    }

    if (animatedColor.value !== color) {
      // To color...
      animatedColor.value = withTiming(color);

      // Swap color with animatedColor
      if (currentColor !== animatedColor) {
        setCurrentColor(animatedColor);
      }
    }

    return navigation.addListener('beforeRemove', closingSwapColor);
  }, [
    color,
    animatedColor,
    currentColor,
    navigation,
    isClosing,
    closingSwapColor,
  ]);

  //#endregion

  //#region PanGesture

  const {height: screenHeight} = useWindowDimensions();
  const screenOffsetTop = useHeaderHeight();
  const minY = -screenHeight / 2 + screenOffsetTop;
  const maxY = 50;
  const panY = useSharedValue(0);
  const opened = useSharedValue(false);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{translateY: panY.value}],
    zIndex: panY.value < -100 ? 1 : 0,
  }));

  const panGesture = Gesture.Pan()
    .requireExternalGestureToFail()
    .minDistance(50)
    .onChange(e => {
      const baseValue = opened.value ? minY : 0;
      panY.value = clamp(baseValue + e.translationY, minY, maxY);
    })
    .onFinalize(() => {
      const isOpened = opened.value
        ? panY.value < minY + 100
        : panY.value < -100;
      const endY = isOpened ? minY : 0;

      opened.value = isOpened;
      panY.value = withSpring(endY, {
        mass: 1,
        damping: 50,
        stiffness: 500,
      });
    });

  //#endregion

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AnimatedBackground
        color={isClosing ? color : currentColor}
        sharedKey={pokemonId}
      />
      <Block />
      <Dots />
      <Summary color={animatedColor} transitionY={panY} />
      <Animated.View style={[styles.panel, panelStyle]}>
        <GestureDetector gesture={panGesture}>
          <Details />
        </GestureDetector>
      </Animated.View>
    </>
  );
};

export default CardScreen;
