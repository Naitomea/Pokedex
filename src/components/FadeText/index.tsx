import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  setNativeProps,
  AnimatedRef,
  AnimatedStyle,
} from 'react-native-reanimated';
import {TextInput} from 'react-native-gesture-handler';

import {DURATIONS} from '../../constants';
import styles from './styles';

Animated.addWhitelistedNativeProps({text: true});
const AnimatedText = Animated.createAnimatedComponent(TextInput);

export type FadeTextProps = {
  text: SharedValue<string>;
  style?: AnimatedStyle<StyleProp<TextStyle>>;
  enable?: boolean;
  ref?: AnimatedRef<TextInput>;
};

const FadeText = ({text, enable = true, ...props}: FadeTextProps) => {
  const internalRef = useAnimatedRef<TextInput>();
  const ref = props.ref || internalRef;
  const opacity = useSharedValue(1);

  const fadingStyle = useAnimatedStyle(() => ({
    opacity: enable ? opacity.value : 1,
  }));

  useAnimatedReaction(
    () => text.value,
    (currentValue, previousValue) => {
      if (!enable) {
        setNativeProps(ref, {text: currentValue});
        return;
      }

      if (currentValue === previousValue) {
        return;
      }

      opacity.value = withTiming(
        0,
        {easing: Easing.in(Easing.quad), duration: 200 /* DURATIONS.fade */},
        () => {
          setNativeProps(ref, {text: currentValue});
          opacity.value = withTiming(1, {
            easing: Easing.out(Easing.quad),
            duration: 200 /* DURATIONS.fade */,
          });
        },
      );
    },
  );

  return (
    <AnimatedText
      ref={ref}
      style={[styles.text, fadingStyle, props.style]}
      underlineColorAndroid={'transparent'}
      multiline={true}
      editable={false}
      textAlignVertical={'top'}
    />
  );
};

export default FadeText;
