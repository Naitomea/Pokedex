import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../../../navigation/types';
import {useAppSelector} from '../../../store';
import {selectPokemon} from '../../../store/reducers/pokemon';

import Header from './Header';

import {getSharedKeys} from '../../../utils';
import styles from './styles';
import SafeView from '../../../components/SafeView';
import SliderImage from './SliderImage';
import FadeElement from '../../../components/FadeElement';

export type SummaryProps = {
  color: SharedValue<string>;
  transitionY?: SharedValue<number>;
};

const Summary = (props: SummaryProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'Card'>>();
  const {pokemonId} = route.params;

  const [mode3D, setMode3D] = useState(false);

  const pokemon = useAppSelector(selectPokemon(pokemonId));
  const sharedKeys = getSharedKeys(pokemonId);

  const rotation = useSharedValue(0);
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: rotation.value + 'deg',
      },
    ],
  }));

  useEffect(() => {
    rotation.value = withDelay(
      300,
      withRepeat(withTiming(360, {duration: 4500, easing: Easing.linear}), -1),
    );
  }, [rotation]);

  //#region Container Measurements

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navigationBarHeight = insets.bottom;
  const headerHeight = useHeaderHeight() - statusBarHeight;
  const topOffset = statusBarHeight + headerHeight;

  const {height} = useWindowDimensions();
  const screenHeight = height + navigationBarHeight + statusBarHeight;

  const heightRatio = 0.5;
  const containerHeight = screenHeight * heightRatio - topOffset;

  //#endregion

  return (
    <SafeView>
      <View style={[styles.container, {height: containerHeight}]}>
        {/* Logo */}
        <SharedElement id={sharedKeys.logo} style={styles.containerLogo}>
          <View style={styles.contentLogo}>
            <Animated.Image
              source={require('./../../../data/logo_w.png')}
              // tintColor={'#000'}
              resizeMode={'contain'}
              style={[styles.logoBackground, rotationStyle]}
            />
          </View>
        </SharedElement>

        {/* Slider */}
        <SliderImage color={props.color} transitionY={props.transitionY} />

        {/* 2D/3D Mode Icon */}
        {/* <FadeElement style={StyleSheet.absoluteFill}>
          {pokemon.captured && (
            <SharedElement
              id={sharedKeys.captured}
              style={styles.capturedIndicatorContainer}> */}
        <TouchableOpacity
          style={[
            styles.modeContainer,
            mode3D ? styles.mode3DIcon : styles.mode2DIcon,
          ]}>
          <MaterialIcons
            name="3d-rotation"
            // style={mode3D ? styles.mode3DIcon : styles.mode2DIcon}
            size={24}
            color={'#000'}
            onPress={() => setMode3D(!mode3D)}
          />
        </TouchableOpacity>
        {/* </SharedElement>
          )}
        </FadeElement> */}

        {/* Captured Indicator */}
        <FadeElement style={StyleSheet.absoluteFill}>
          {pokemon.captured && (
            <SharedElement
              id={sharedKeys.captured}
              style={styles.capturedIndicatorContainer}>
              <Image
                source={require('./../../../data/logo_w.png')}
                tintColor={'#000'}
                style={styles.capturedIndicator}
              />
            </SharedElement>
          )}
        </FadeElement>

        {/* Header */}
        <Header transitionY={props.transitionY} />
      </View>
    </SafeView>
  );
};

export default Summary;
