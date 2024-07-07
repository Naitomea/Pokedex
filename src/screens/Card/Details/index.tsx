import React, {createContext} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

import {RootStackParamList} from '../../../navigation/types';
import About from './About';

import styles from './styles';
import {getSharedKeys} from '../../../utils';

const Tab = createMaterialTopTabNavigator();

const TabBarLabel = ({
  color,
  children,
}: {
  focused: boolean;
  color: string;
  children: string;
}) => (
  <Text
    numberOfLines={1}
    style={StyleSheet.compose(styles.tabBarLabel, {color})}>
    {children}
  </Text>
);

const TabBarIndicator = (props: any) => {
  const tabCount = props.state.routes.length;
  const tabWidths: number[] = props.state.routes.map((_: any, i: number) =>
    props.getTabWidth(i),
  );
  const totalTabWidth = tabWidths.reduce(
    (totalWidth, tabWidth) => totalWidth + tabWidth,
    0,
  );
  const tabGap = (props.layout.width - totalTabWidth) / (tabCount - 1);
  const tabOffsets = tabWidths.map((_, i, a) =>
    a.slice(0, i).reduce((t, c) => t + c + tabGap, 0),
  );

  return (
    <Animated.View
      key={props.state.key}
      style={StyleSheet.compose(styles.tabBarIndicator, {
        backgroundColor: props.style[0].backgroundColor,
        transformOrigin: 'left bottom',
        transform: [
          {
            translateX: props.position.interpolate({
              inputRange: props.state.routes.map((_: any, i: number) => i),
              outputRange: tabOffsets,
              extrapolate: 'clamp',
            }),
          },
          {
            scaleX: props.position.interpolate({
              inputRange: props.state.routes.map((_: any, i: number) => i),
              outputRange: tabWidths,
              extrapolate: 'clamp',
            }),
          },
        ],
        width: 1,
      })}
    />
  );
};

export const DetailsContext = createContext(-1);
// export const DetailsContext = createContext({pokemonId: -1, hide: false});

export type DetailsProps = {
  hide?: boolean;
};

const Details = (props: DetailsProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'Card'>>();
  const sharedKeys = getSharedKeys(route.params.pokemonId);

  return (
    <SharedElement
      id={sharedKeys.details}
      style={[styles.panel, props.hide ? styles.hide : styles.show]}>
      <View style={styles.container}>
        <DetailsContext.Provider value={route.params.pokemonId || 1}>
          <Tab.Navigator
            sceneContainerStyle={styles.tabSceneContainer}
            screenOptions={{
              tabBarStyle: styles.tabBar,
              tabBarContentContainerStyle: styles.tabBarContentContainer,
              tabBarItemStyle: styles.tabBarItem,
              tabBarLabel: TabBarLabel,
              tabBarPressColor: 'transparent',
              tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainer,
              tabBarIndicator: TabBarIndicator,
            }}
            backBehavior="none">
            <Tab.Screen name="About" component={About} />
            <Tab.Screen name="Infos" component={View} />
            <Tab.Screen name="Stats" component={View} />
            <Tab.Screen name="Locations" component={View} />
          </Tab.Navigator>
        </DetailsContext.Provider>
      </View>
    </SharedElement>
  );
};

export default Details;
