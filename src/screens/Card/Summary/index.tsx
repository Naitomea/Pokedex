import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
// import UnityView from '@azesmway/react-native-unity';
// import {
//   FilamentScene,
//   FilamentView,
//   DefaultLight,
//   Model,
//   Camera,
//   Light,
//   Animator,
// } from 'react-native-filament';

import {RootStackParamList} from '../../../navigation/types';
import {useAppSelector} from '../../../store';
import {selectPokemon} from '../../../store/reducers/pokemon';

import Header from './Header';

import {getSharedKeys} from '../../../utils';
import styles from './styles';
import SliderImage from './SliderImage';
import FadeElement from '../../../components/FadeElement';
// import MyModel from '../../../data/0001Bulbasaur.glb';

export type SummaryProps = {
  color: SharedValue<string>;
  transitionY?: SharedValue<number>;
};

const Summary = (props: SummaryProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'Card'>>();
  const {pokemonId} = route.params;

  const pokemon = useAppSelector(selectPokemon(pokemonId));
  const sharedKeys = getSharedKeys(pokemonId);

  const [mode3D, setMode3D] = useState(false);

  const topOffset = useHeaderHeight();

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

  return (
    <View style={[styles.container, {paddingTop: topOffset}]}>
      <View style={styles.content}>
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

        {/*<View style={[StyleSheet.absoluteFill, {/* opacity: 0.5 /}]}>
          <FilamentScene>
            {/* 🏞️ A view to draw the 3D content to /}
            <FilamentView style={{flex: 1, position: 'relative', top: 40}}>
              {/* 💡 A light source, otherwise the scene will be black /}
              <Light
                type="directional"
                intensity={100_000}
                colorKelvin={5000}
                castShadows={true}
                direction={[0, -0.77, -0.64]}
              />

              {/* 📦 A 3D model /}
              <Model source={MyModel} transformToUnitCube>
                <Animator animationIndex={4} />
              </Model>

              {/* 📹 A camera through which the scene is observed and projected onto the view /}
              <Camera
                cameraPosition={[0, -0.5, 1.5]}
                cameraTarget={[0, -0.5, 0]}
              />
            </FilamentView>
          </FilamentScene>
          {/* <View style={{flex: 1, backgroundColor: 'blue'}} /> /}
          {/* <UnityView
            style={{position: 'relative', top: 40, flex: 1, backgroundColor: 'transparent'}}
            fullScreen={false}
          /> /}
        </View>*/}

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
    </View>
  );
};

export default Summary;
