import React from 'react';
import {View, ViewStyle, StyleProp, StyleSheet, ColorValue} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

import {PropsWithSharedKey, getSharedKeys} from '../../utils';

import styles from './styles';

export type AnimatedBackgroundProps = {
  style?: StyleProp<ViewStyle>;
  color?: SharedValue<string> | ColorValue;
};

const AnimatedBackground = ({
  style,
  color,
  sharedKey,
}: PropsWithSharedKey<AnimatedBackgroundProps>) => {
  const sharedKeys = getSharedKeys(sharedKey);
  const bgColor = {backgroundColor: color};

  return (
    <View style={[style, styles.container]}>
      <SharedElement style={styles.content} id={sharedKeys.background_c}>
        <Animated.View style={[styles.center, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_t}>
        <Animated.View style={[styles.sideVertical, styles.top, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_b}>
        <Animated.View style={[styles.sideVertical, styles.bottom, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_l}>
        <Animated.View style={[styles.sideHorizontal, styles.left, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_r}>
        <Animated.View style={[styles.sideHorizontal, styles.right, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_tl}>
        <Animated.View style={[styles.corner, styles.topLeft, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_tr}>
        <Animated.View style={[styles.corner, styles.topRight, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_br}>
        <Animated.View style={[styles.corner, styles.bottomRight, bgColor]} />
      </SharedElement>
      <SharedElement style={styles.content} id={sharedKeys.background_bl}>
        <Animated.View style={[styles.corner, styles.bottomLeft, bgColor]} />
      </SharedElement>
    </View>
  );
};

export default AnimatedBackground;
