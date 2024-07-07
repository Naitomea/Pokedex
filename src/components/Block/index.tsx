import React, {useMemo} from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';

import styles from './styles';

const Block = () => {
  const enteringAnimation = useMemo(() => FadeIn.delay(300), []);

  return <Animated.View style={styles.block} entering={enteringAnimation} />;
};

export default Block;
