import React, {PropsWithChildren, useMemo} from 'react';
import {
  ColorValue,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {
  FadeInDown,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AnimatedBackground from '../AnimatedBackground';

import {PropsWithSharedKey, getSharedKeys} from '../../utils';

import styles from './styles';

export type ItemCardProps = {
  index?: number;
  name: string;
  text?: string;
  color?: ColorValue;
  img?: any;
  discovered?: boolean;
  checked?: boolean;
  new?: boolean;
  onPress?: () => void;

  mode?: 'light' | 'dark';
  centerTitle?: boolean;
};

const ItemCard = (
  props: PropsWithSharedKey<PropsWithChildren<ItemCardProps>>,
) => {
  const undiscovered = props.discovered === false;
  const sharedKeys = getSharedKeys(props.sharedKey);

  const textColor = props.mode === 'dark' ? '#fff' : '#000';
  const backgroundColor = props.color || '#f2f2f2';
  const backgroundColorStyle = {backgroundColor};
  const overlayOpacity = useSharedValue(0);

  const enteringAnimation = useMemo(
    () =>
      typeof props.index === 'number'
        ? FadeInDown.duration(500).delay(150 * Math.floor(props.index / 2))
        : undefined,
    [props.index],
  );

  return (
    <View style={[styles.container /*, styles.containerCompact*/]}>
      <Pressable
        style={styles.button}
        onPressIn={() =>
          (overlayOpacity.value = withTiming(1, {duration: 200}))
        }
        onPressOut={() =>
          (overlayOpacity.value = withTiming(0, {duration: 200}))
        }
        onPress={props.onPress}
        disabled={undiscovered}>
        <Animated.View
          entering={enteringAnimation}
          style={[styles.buttonContent, backgroundColorStyle]}>
          <AnimatedBackground
            color={backgroundColor}
            sharedKey={props.sharedKey}
            style={styles.background}
          />
          <View style={styles.content}>
            {/* Logo */}
            <SharedElement id={sharedKeys.logo} style={StyleSheet.absoluteFill}>
              <Image
                source={require('./../../data/logo_w.png')}
                resizeMode="contain"
                tintColor={textColor}
                style={[
                  styles.logoBackground,
                  props.mode !== 'dark' && styles.logoBackgroundLight,
                ]}
              />
            </SharedElement>

            {/* Image */}
            {props.img && (
              <SharedElement
                id={sharedKeys.image}
                style={StyleSheet.absoluteFill}>
                <Image
                  source={
                    typeof props.img === 'string' ? {uri: props.img} : props.img
                  }
                  resizeMode="contain"
                  style={[
                    styles.image,
                    undiscovered && styles.imageUndiscovered,
                  ]}
                />
              </SharedElement>
            )}

            {/* Body */}
            <View style={styles.body}>
              {/* Header */}
              <View
                style={[
                  styles.header,
                  props.centerTitle && styles.centerHeader,
                ]}>
                <SharedElement id={sharedKeys.name}>
                  <Text style={[styles.name, {color: textColor}]}>
                    {undiscovered ? '???' : props.name}
                  </Text>
                </SharedElement>
                {props.text && (
                  <SharedElement id={sharedKeys.id}>
                    <Text style={[styles.text, {color: textColor}]}>
                      {props.text}
                    </Text>
                  </SharedElement>
                )}
              </View>
              {props.children}
            </View>

            {/* Captured Indicator */}
            {props.checked && (
              <SharedElement
                id={sharedKeys.captured}
                style={StyleSheet.absoluteFill}>
                <Image
                  source={require('./../../data/logo_w.png')}
                  tintColor={'#000'}
                  style={styles.capturedIndicator}
                />
              </SharedElement>
            )}
            <Animated.View
              style={[styles.buttonOverlay, {opacity: overlayOpacity}]}
            />
          </View>
          {props.new && <View style={styles.newBadge} />}
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default ItemCard;
