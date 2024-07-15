import React, {useState, useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ColorValue, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  clamp,
  SharedValue,
  useDerivedValue,
  runOnJS,
  interpolate,
  useAnimatedStyle,
  Extrapolation,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {RootStackParamList} from '../../../../navigation/types';
import {useAppSelector} from '../../../../store';
import {
  selectAllPokemon,
  selectGenerationById,
  selectPokemon,
} from '../../../../store/reducers/pokemon';

import ImageSlider from './../ImageSlider';

import {darker} from '../../../../utils';

import styles from './styles';

export type SliderProps = {
  color: SharedValue<string>;
  transitionY?: SharedValue<number>;
};

const SliderImage = ({transitionY, ...props}: SliderProps) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Card'>>();
  const {pokemonId} = route.params;

  const pokemon = useAppSelector(selectPokemon(pokemonId));
  const generation = useAppSelector(selectGenerationById(pokemon.generationId));
  const allPokemon = useAppSelector(selectAllPokemon(generation.pokemon));
  const pokemonCount = allPokemon.length;

  const mainColor = props.color;
  const tintColor = useDerivedValue<ColorValue>(() =>
    darker(mainColor.value, 0.3),
  );

  const fadingStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      transitionY?.value || 0,
      [0, -100],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  //#region Pokémon Gestures

  const {width: screenWidth} = useWindowDimensions();

  const index = useSharedValue(pokemon.order);
  const sliderX = useSharedValue(-index.value);
  const offset = useSharedValue(0);

  const switchPokemon = (newIndex: number) => {
    navigation.setParams({pokemonId: allPokemon[newIndex].id});
  };

  const panGesture = Gesture.Pan()
    .onChange(e => {
      const dist = e.translationX / (screenWidth * 0.5);
      const newValue = clamp(
        -index.value + dist,
        -(pokemonCount - 1) - offset.value,
        -offset.value,
      );
      const trueValue = newValue + offset.value;
      const newIndex = Math.round(Math.abs(trueValue));

      if (index.value !== newIndex) {
        sliderX.value = trueValue;
        offset.value += newIndex - index.value;
        index.value = newIndex;

        runOnJS(switchPokemon)(newIndex);
      } else {
        sliderX.value = trueValue;
      }
    })
    .onFinalize(() => {
      sliderX.value = withSpring(-index.value);
      offset.value = 0;
    });

  //#endregion

  //#region Slider Images

  const limitIndex = 3;
  const currentIndex = pokemon.order;
  const minIndex = Math.max(currentIndex - limitIndex, 0);
  const maxIndex = Math.min(currentIndex + limitIndex, pokemonCount - 1);
  const [lastIndex, setLastIndex] = useState(currentIndex);
  const [sliderImages, setSliderImages] = useState(
    allPokemon.map((p, i) => {
      if (i < minIndex || i > maxIndex) {
        return undefined;
      }

      return (
        <ImageSlider
          key={p.id}
          style={styles.imageSlider}
          pokemon={p}
          resizeMode="contain"
          tintColor={tintColor}
          transition={sliderX}
          transitionY={transitionY}
          fadeIn={p.id !== pokemonId}
        />
      );
    }),
  );

  useEffect(() => {
    // All required images already created
    if (currentIndex === lastIndex) {
      return;
    }

    setLastIndex(currentIndex);
    setSliderImages(imgs =>
      imgs.map((img, i) => {
        // Need to be destroyed
        if (i < minIndex || i > maxIndex) {
          return undefined;
        }

        // Already created
        if (img) {
          return img;
        }

        // Has to be created
        const p = allPokemon[i];

        return (
          <ImageSlider
            key={p.id}
            style={styles.imageSlider}
            pokemon={p}
            tintColor={tintColor}
            transition={sliderX}
            transitionY={transitionY}
          />
        );
      }),
    );
  }, [
    allPokemon,
    currentIndex,
    lastIndex,
    maxIndex,
    minIndex,
    sliderImages,
    sliderX,
    transitionY,
    tintColor,
  ]);

  //#endregion

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[StyleSheet.absoluteFill, fadingStyle]}>
        {sliderImages.slice(minIndex, maxIndex + 1)}
      </Animated.View>
    </GestureDetector>
  );
};

export default SliderImage;
