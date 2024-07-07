import React, {
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

export type FadeElementProps = {
  style?: StyleProp<ViewStyle>;
  enable?: boolean;
};

const FadeElement = ({
  children,
  enable = true,
  ...props
}: PropsWithChildren<FadeElementProps>) => {
  const [currentChildren, setCurrentChildren] = useState(children);
  const [isFading, setIsFading] = useState(false);

  const opacity = useSharedValue(1);
  const fadingStyle = useAnimatedStyle(() => ({
    opacity: enable ? opacity.value : 1,
  }));

  const switchChildren = useCallback(() => {
    setCurrentChildren(children);
    setIsFading(false);

    opacity.value = withTiming(1, {
      easing: Easing.out(Easing.quad),
      duration: 200,
    });
  }, [children, opacity]);

  useEffect(() => {
    if (!enable || isFading || children === currentChildren) {
      if (!enable) {
        cancelAnimation(opacity);
      }
      return;
    }

    setIsFading(true);

    opacity.value = withTiming(
      0,
      {easing: Easing.in(Easing.quad), duration: 200},
      () => runOnJS(switchChildren)(),
    );
  }, [enable, children, currentChildren, switchChildren, opacity, isFading]);

  return (
    <Animated.View style={[props.style, fadingStyle]}>
      {currentChildren}
    </Animated.View>
  );
};

export default FadeElement;
