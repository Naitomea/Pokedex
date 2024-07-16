import React from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {TextInput} from 'react-native-gesture-handler';

import {RootStackParamList} from '../../../../navigation/types';
import {useAppSelector} from '../../../../store';
import {selectPokemon} from '../../../../store/reducers/pokemon';
import {getSharedKeys} from '../../../../utils';

import styles from './styles';
import FadeText from '../../../../components/FadeText';
import AnimatedPills from '../../../../components/Pills/animated';

export type HeaderProps = {
  transitionY?: SharedValue<number>;
};

const Header = ({transitionY}: HeaderProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'Card'>>();
  const {pokemonId} = route.params;
  const pokemon = useAppSelector(selectPokemon(pokemonId));

  const sharedKeys = getSharedKeys(pokemonId);

  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const screenOffsetTop = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const minTop = -screenOffsetTop + statusBarHeight;
  const minPanY = -screenHeight / 2 + screenOffsetTop;
  const fontSizeScale = 24 / 38;
  const titleRef = useAnimatedRef<TextInput>();

  const titleStyle = useAnimatedStyle(() => {
    const titleMeasure = measure(titleRef);
    const toLeft = titleMeasure
      ? screenWidth / 2 - titleMeasure.width / 2 - 24
      : 0;

    return {
      top: interpolate(
        transitionY?.value || 0,
        [0, minPanY],
        [0, minTop],
        Extrapolation.CLAMP,
      ),
      left: interpolate(
        transitionY?.value || 0,
        [0, minPanY],
        [0, toLeft],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            transitionY?.value || 0,
            [0, minPanY],
            [1, fontSizeScale],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const fadingStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      transitionY?.value || 0,
      [0, -200],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const pokemonIdStr = `#${pokemonId.toString().padStart(3, '0')}`;
  const dvPokemonIdStr = useDerivedValue(() => pokemonIdStr);

  const pokemonName = pokemon.discovered ? pokemon.name : '???';
  const dvPokemonName = useDerivedValue(() => pokemonName);

  const pokemonTypeA =
    pokemon.discovered && pokemon.types.length > 0 ? pokemon.types[0] : '???';
  const dvPokemonTypeA = useDerivedValue(() => pokemonTypeA);
  const pokemonTypeB =
    pokemon.discovered && pokemon.types.length > 1 ? pokemon.types[1] : '';
  const dvPokemonTypeB = useDerivedValue(() => pokemonTypeB);

  return (
    <>
      <View style={styles.container}>
        <SharedElement id={sharedKeys.name}>
          <View ref={titleRef} collapsable={false}>
            <FadeText style={[styles.title, titleStyle]} text={dvPokemonName} />
          </View>
        </SharedElement>
        <SharedElement id={sharedKeys.id}>
          <View collapsable={false}>
            <FadeText style={[styles.id, fadingStyle]} text={dvPokemonIdStr} />
          </View>
        </SharedElement>
      </View>
      <Animated.View style={fadingStyle}>
        <AnimatedPills
          style={styles.pills}
          items={[dvPokemonTypeA, dvPokemonTypeB]}
          direction="row"
          size="large"
          sharedKey={pokemonId}
        />
      </Animated.View>
    </>
  );
};

export default Header;
