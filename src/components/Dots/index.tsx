import React, {useMemo, useState} from 'react';
import {FlatList, ViewProps} from 'react-native';
import {View} from 'react-native';
import Animated, {AnimatedProps, FadeIn} from 'react-native-reanimated';

import styles from './styles';

const Dots = ({style, ...props}: AnimatedProps<ViewProps>) => {
  const [dots] = useState(Array.from(Array(15).keys()));

  const enteringAnimation = useMemo(() => FadeIn.delay(300), []);

  return (
    <Animated.View
      style={[styles.container, style]}
      entering={enteringAnimation}
      {...props}>
      <FlatList
        data={dots}
        keyExtractor={key => String(key)}
        numColumns={5}
        renderItem={({item: dot}) => {
          return <View key={dot} style={styles.dot} />;
        }}
      />
    </Animated.View>
  );
};

export default Dots;
