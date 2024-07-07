import React, {useMemo} from 'react';
import {
  ColorValue,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeInRight,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

import {PokemonData} from '../../../../types';

import styles from './styles';
import {getSharedKeys} from '../../../../utils';

export type AnimatedImageProps = {
  pokemon: PokemonData;

  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;

  resizeMode?: ImageResizeMode;
  tintColor?: SharedValue<ColorValue>;

  transition: SharedValue<number>;
  transitionY?: SharedValue<number>;
  fadeIn?: boolean;
};

const ImageSlider = ({
  pokemon,
  transition,
  transitionY,
  fadeIn = false,
  ...props
}: AnimatedImageProps) => {
  const {width: screenWidth} = useWindowDimensions();
  const offset = pokemon.order;
  const progression = useDerivedValue(() => transition.value + offset);

  const sharedKeys = getSharedKeys(pokemon.id);

  // Entering Animation
  const enteringEnded = useSharedValue(!fadeIn);
  const enteringAnimation = useMemo(
    () =>
      fadeIn
        ? progression.value > 0
          ? FadeInRight.delay(300).withCallback(finished => {
              enteringEnded.value = finished;
            })
          : FadeInLeft.delay(300).withCallback(finished => {
              enteringEnded.value = finished;
            })
        : undefined,
    [enteringEnded, fadeIn, progression],
  );

  // Animated Styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: progression.value * screenWidth * 0.5},
        {
          scale: interpolate(
            progression.value,
            [-1, 0, 1],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  const mainImageStyle = useAnimatedStyle(() => {
    let opacity = progression.value % 1 === 0 && !enteringEnded.value ? 0 : 1;

    if (progression.value % 1 !== 0 && !enteringEnded.value) {
      opacity = interpolate(
        progression.value,
        [-1, 0, 1],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
    }

    return {
      opacity: opacity,
    };
  });
  const overlayImageStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progression.value,
      [-1, 0, 1],
      [1, 0, 1],
      Extrapolation.CLAMP,
    ),
  }));
  const transitionYStyle = useAnimatedStyle(() => {
    let transform = [{scale: 1}, {translateY: 0}];

    // if (progression.value === 0) {
    transform = [
      {
        scale: interpolate(transitionY?.value || 0, [0, -100], [1, 0.9]),
      },
      {translateY: (transitionY?.value || 0) * 0.5},
    ];
    // }

    return {
      transform: transform,
    };
  });

  // Render
  return (
    <Animated.View style={[props.style, containerStyle]}>
      <Animated.View
        style={[styles.imageContainer, styles.image]}
        entering={enteringAnimation}>
        <SharedElement id={sharedKeys.image} style={[StyleSheet.absoluteFill]}>
          <>
            <Animated.Image
              src={pokemon.img}
              resizeMode={props.resizeMode || 'contain'}
              style={[
                styles.image,
                props.imageStyle,
                !pokemon.discovered && styles.imageUndiscovered,
                mainImageStyle,
                transitionYStyle,
              ]}
            />
            <Animated.Image
              src={pokemon.img}
              resizeMode={props.resizeMode || 'contain'}
              tintColor={props.tintColor}
              style={[
                styles.image,
                props.imageStyle,
                overlayImageStyle,
                transitionYStyle,
              ]}
            />
          </>
        </SharedElement>
      </Animated.View>
    </Animated.View>
  );
};

export default ImageSlider;
