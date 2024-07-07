import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

import styles from './styles';
import {PropsWithSharedKey, getSharedKeys} from '../../utils';
import {SharedElement} from 'react-navigation-shared-element';

export type PillsProps = {
  items: ReactNode;
  direction?: 'row' | 'column';
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
};

const Pills = ({
  items,
  direction = 'row',
  size = 'small',
  style: customStyleContainer,
  sharedKey,
}: PropsWithSharedKey<PillsProps>) => {
  const sharedKeys = getSharedKeys(sharedKey);

  return (
    <View
      style={StyleSheet.compose(styles.container, [
        direction === 'row' ? styles.row : styles.column,
        size === 'large' && styles.containerLarge,
        customStyleContainer,
      ])}>
      {React.Children.map(items, (child, i) => (
        <SharedElement id={i === 0 ? sharedKeys.type_1 : sharedKeys.type_2}>
          <Text
            key={i}
            style={StyleSheet.compose(
              styles.pill,
              size === 'large' && styles.pillLarge,
            )}>
            {child}
          </Text>
        </SharedElement>
      ))}
    </View>
  );
};

export default Pills;
