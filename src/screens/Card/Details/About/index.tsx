import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';

import FadeText from '../../../../components/FadeText';
import Gender from './Gender';

import {useAppSelector} from '../../../../store';
import {selectPokemon} from '../../../../store/reducers/pokemon';
import {
  cmToFeetAndInches,
  cmToM,
  feetAndInchesToString,
  kgToPounds,
  kilogramsToString,
  metersToString,
  poundsToString,
} from '../../../../utils';
import {DetailsContext} from '..';

import styles from './styles';

const About = () => {
  const pokemonId = useContext(DetailsContext);
  const pokemon = useAppSelector(selectPokemon(pokemonId));
  const isDiscovered = pokemon.discovered;

  const description = pokemon.description;
  const dvDescription = useDerivedValue(() =>
    isDiscovered ? description : '???',
  );

  const height = `${metersToString(
    cmToM(pokemon.height),
  )} (${feetAndInchesToString(cmToFeetAndInches(pokemon.height))})`;
  const dvHeight = useDerivedValue(() => (isDiscovered ? height : '???'));

  const weight = `${kilogramsToString(pokemon.weight)} (${poundsToString(
    kgToPounds(pokemon.weight),
  )})`;
  const dvWeight = useDerivedValue(() => (isDiscovered ? weight : '???'));

  const eggGroups = pokemon.eggGroups.join(' ');
  const dvEggGroups = useDerivedValue(() => (isDiscovered ? eggGroups : '???'));

  const baseEXP = pokemon.baseEXP.toString();
  const dvBaseEXP = useDerivedValue(() => (isDiscovered ? baseEXP : '???'));

  return (
    <View style={styles.panel}>
      <FadeText style={[styles.text, styles.flavorText]} text={dvDescription} />

      {/* Size */}
      <View style={styles.measurementContainer}>
        <View style={styles.measurementItem}>
          <Text style={StyleSheet.compose(styles.text, styles.subTitle)}>
            Height
          </Text>
          <FadeText style={styles.text} text={dvHeight} />
        </View>
        <View style={styles.measurementItem}>
          <Text style={StyleSheet.compose(styles.text, styles.subTitle)}>
            Weight
          </Text>
          <FadeText style={styles.text} text={dvWeight} />
        </View>
      </View>

      {/* Breeding */}
      <View style={styles.infoContainer}>
        <Text style={StyleSheet.compose(styles.text, styles.title)}>
          Breeding
        </Text>
        <View style={styles.infoContent}>
          <View style={styles.infoItem}>
            <Text
              style={StyleSheet.compose(styles.text, [
                styles.subTitle,
                styles.infoSubTitle,
              ])}>
              Gender
            </Text>
            <Gender
              pokemon={pokemon}
              containerStyle={styles.infoValue}
              subContainerStyle={styles.infoSubValue}
              textStyle={styles.text}
            />
          </View>
          <View style={styles.infoItem}>
            <Text
              style={StyleSheet.compose(styles.text, [
                styles.subTitle,
                styles.infoSubTitle,
              ])}>
              Egg Groups
            </Text>
            <FadeText
              style={[styles.text, {textTransform: 'capitalize'}]}
              text={dvEggGroups}
            />
          </View>
        </View>
      </View>

      {/* Training */}
      <View style={styles.infoContainer}>
        <Text style={StyleSheet.compose(styles.text, styles.title)}>
          Training
        </Text>
        <View style={styles.infoContent}>
          <View style={styles.infoItem}>
            <Text
              style={StyleSheet.compose(styles.text, [
                styles.subTitle,
                styles.infoSubTitle,
              ])}>
              Base EXP
            </Text>
            <FadeText style={styles.text} text={dvBaseEXP} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default About;
