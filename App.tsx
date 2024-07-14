import React from 'react';
import {useColorScheme} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from './src/navigation/types';
import CollectionsScreen from './src/screens/Collections';
import CollectionScreen from './src/screens/Collection';
import CardScreen from './src/screens/Card';

import store from './src/store';
import DataUpdater from './src/components/DataUpdater';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {getSharedKeys, sortSharedKeys} from './src/utils';
import {HeaderButtonsProvider} from 'react-navigation-header-buttons/HeaderButtonsProvider';
import {
  HeaderButton,
  HeaderButtonProps,
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';

const RootStack = createSharedElementStackNavigator<RootStackParamList>();
const MaterialHeaderButton = (props: HeaderButtonProps) => (
  <HeaderButton IconComponent={MaterialIcons} iconSize={28} {...props} />
);

function App(): React.JSX.Element {
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <HeaderButtonsProvider stackType="js">
              <RootStack.Navigator
                initialRouteName="Collections"
                screenOptions={{
                  // statusBarStyle: 'dark',
                  // statusBarColor: 'rgba(0, 0, 0, 0)',
                  // statusBarTranslucent: true,
                  headerTransparent: true,
                  headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
                  headerBackTitleVisible: false,
                  headerShown: true,
                }}>
                <RootStack.Screen
                  name="Collections"
                  component={CollectionsScreen}
                  options={{
                    title: 'Pokédex',
                    headerRight: () => (
                      <HeaderButtons
                        HeaderButtonComponent={MaterialHeaderButton}>
                        <Item iconName="more-vert" color={'#000'} title={''} />
                      </HeaderButtons>
                    ),
                  }}
                />
                <RootStack.Screen
                  name="Collection"
                  component={CollectionScreen}
                  options={({route}) => ({
                    title: route.params.title,
                    headerRight: () => (
                      <HeaderButtons
                        HeaderButtonComponent={MaterialHeaderButton}>
                        <Item iconName="more-vert" color={'#000'} title={''} />
                      </HeaderButtons>
                    ),
                  })}
                />
                <RootStack.Screen
                  name="Card"
                  component={CardScreen}
                  options={({route}) => ({
                    presentation: 'modal',
                    cardStyle: {backgroundColor: 'transparent'},
                    cardOverlayEnabled: false,
                    title: '',
                    headerTintColor: 'white',
                    headerRight: () => (
                      <HeaderButtons
                        HeaderButtonComponent={MaterialHeaderButton}>
                        <Item
                          iconName="favorite-outline"
                          color={'#fff'}
                          title={''}
                        />
                      </HeaderButtons>
                    ),
                  })}
                  sharedElements={(route, otherRoute, showing) => {
                    const {pokemonId} = route.params;
                    return sortSharedKeys(getSharedKeys(pokemonId));
                  }}
                />
              </RootStack.Navigator>
            </HeaderButtonsProvider>
          </NavigationContainer>
          <DataUpdater />
        </SafeAreaProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

export default App;
