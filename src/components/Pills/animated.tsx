import React from 'react';
import {View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {SharedValue} from 'react-native-reanimated';

import {PillsProps} from '.';
import FadeText from '../FadeText';

import {PropsWithSharedKey, getSharedKeys} from '../../utils';
import styles from './styles';

export type AnimatedPillsProps = {
  items: SharedValue<string>[];
} & Omit<PillsProps, 'items'>;

const AnimatedPills = ({
  items,
  direction = 'row',
  size = 'small',
  style: customStyleContainer,
  sharedKey,
}: PropsWithSharedKey<AnimatedPillsProps>) => {
  const sharedKeys = getSharedKeys(sharedKey);

  return (
    <View
      style={[
        styles.container,
        direction === 'row' ? styles.row : styles.column,
        size === 'large' && styles.containerLarge,
        customStyleContainer,
      ]}>
      {items.map((item, i) => (
        <SharedElement id={i === 0 ? sharedKeys.type_1 : sharedKeys.type_2}>
          <FadeText
            key={i}
            style={[
              styles.pill,
              styles.animatedPill,
              size === 'large' && styles.pillLarge,
            ]}
            text={item}
          />
        </SharedElement>
      ))}
    </View>
  );
};

export default AnimatedPills;
