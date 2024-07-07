import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';

export type SafeViewProps = {
  header?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
};

const SafeView = ({
  children,
  header = true,
  top = true,
  bottom = true,
  left = true,
  right = true,
}: PropsWithChildren<SafeViewProps>) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight() - insets.top;

  return (
    <View
      style={StyleSheet.compose(StyleSheet.absoluteFill, {
        paddingTop: (top ? insets.top : 0) + (header ? headerHeight : 0),
        paddingBottom: bottom ? insets.bottom : 0,
        paddingLeft: left ? insets.left : 0,
        paddingRight: right ? insets.right : 0,
      })}>
      {children}
    </View>
  );
};

export default SafeView;
