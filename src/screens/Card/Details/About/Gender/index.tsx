import React from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedReaction,
  useAnimatedRef,
  setNativeProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import {PokemonData} from '../../../../../types';

const AnimatedText = Animated.createAnimatedComponent(TextInput);

export type GenderProps = {
  pokemon: PokemonData;
  containerStyle?: StyleProp<ViewStyle>;
  subContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Gender = ({pokemon, ...props}: GenderProps) => {
  const isDiscovered = pokemon.discovered;
  const hasGender = typeof pokemon.gender !== 'undefined';
  const male = pokemon.gender?.male || 0;
  const female = pokemon.gender?.female || 0;

  const dvIsDiscovered = useDerivedValue(() => isDiscovered);
  const dvHasGender = useDerivedValue(() => hasGender);
  const dvMale = useDerivedValue(() => male);
  const dvFemale = useDerivedValue(() => female);

  const genderlessOpacity = useSharedValue(isDiscovered && !hasGender ? 1 : 0);
  const genderOpacity = useSharedValue(isDiscovered && hasGender ? 1 : 0);
  const notDiscoveredOpacity = useSharedValue(isDiscovered ? 0 : 1);

  const genderlessStyle = useAnimatedStyle(() => ({
    opacity: genderlessOpacity.value,
    display: genderlessOpacity.value === 0 ? 'none' : 'flex',
  }));
  const genderStyle = useAnimatedStyle(() => ({
    opacity: genderOpacity.value,
    display: genderOpacity.value === 0 ? 'none' : 'flex',
  }));
  const notDiscoveredStyle = useAnimatedStyle(() => ({
    opacity: notDiscoveredOpacity.value,
    display: notDiscoveredOpacity.value === 0 ? 'none' : 'flex',
  }));

  const maleRef = useAnimatedRef<TextInput>();
  const femaleRef = useAnimatedRef<TextInput>();

  useAnimatedReaction(
    () => ({
      isDiscovered: dvIsDiscovered.value,
      hasGender: dvHasGender.value,
      male: dvMale.value,
      female: dvFemale.value,
    }),
    (cValue, pValue) => {
      if (!pValue) {
        setNativeProps(maleRef, {text: `${cValue.male}%`});
        setNativeProps(femaleRef, {text: `${cValue.female}%`});
      } else {
        const fadeOutConfig = {
          easing: Easing.in(Easing.quad),
          duration: 200 /* DURATIONS.fade */,
        };
        const fadeInConfig = {
          easing: Easing.out(Easing.quad),
          duration: 200 /* DURATIONS.fade */,
        };

        const callback = () => {
          if (!cValue.isDiscovered) {
            notDiscoveredOpacity.value = withTiming(1, fadeInConfig);
          } else if (!cValue.hasGender) {
            genderlessOpacity.value = withTiming(1, fadeInConfig);
          } else {
            setNativeProps(maleRef, {text: `${cValue.male}%`});
            setNativeProps(femaleRef, {text: `${cValue.female}%`});
            genderOpacity.value = withTiming(1, fadeInConfig);
          }
        };

        // Not discovered
        if (!pValue.isDiscovered && cValue.isDiscovered) {
          notDiscoveredOpacity.value = withTiming(0, fadeOutConfig, callback);
        }
        // Genderless
        else if (!pValue.hasGender && cValue.hasGender) {
          genderlessOpacity.value = withTiming(0, fadeOutConfig, callback);
        }
        // gender
        else if (
          (pValue.hasGender && !cValue.hasGender) ||
          pValue.male !== cValue.male ||
          pValue.female !== cValue.female
        ) {
          genderOpacity.value = withTiming(0, fadeOutConfig, callback);
        }
      }
    },
  );

  const genderlessEl = (
    <Animated.View style={[props.containerStyle, genderlessStyle]}>
      <Text style={props.textStyle}>Genderless</Text>
    </Animated.View>
  );
  const genderEl = (
    <Animated.View style={[props.containerStyle, genderStyle]}>
      <View style={props.subContainerStyle}>
        <MaterialIcons name={'male'} color={'#6890F0'} size={18} />
        <AnimatedText
          ref={maleRef}
          style={[styles.text, props.textStyle]}
          underlineColorAndroid={'transparent'}
          multiline={true}
          editable={false}
          textAlignVertical={'top'}
        />
        {/* <Text style={props.textStyle}>{male}%</Text> */}
      </View>
      <View style={props.subContainerStyle}>
        <MaterialIcons name={'female'} color={'#FA6C6C'} size={18} />
        <AnimatedText
          ref={femaleRef}
          style={[styles.text, props.textStyle]}
          underlineColorAndroid={'transparent'}
          multiline={true}
          editable={false}
          textAlignVertical={'top'}
        />
        {/* <Text style={props.textStyle}>{female}%</Text> */}
      </View>
    </Animated.View>
  );
  const notDiscoveredEl = (
    <Animated.View style={[props.containerStyle, notDiscoveredStyle]}>
      <Text style={props.textStyle}>???</Text>
    </Animated.View>
  );

  return (
    <>
      {genderlessEl}
      {genderEl}
      {notDiscoveredEl}
    </>
  );
};

export default Gender;
