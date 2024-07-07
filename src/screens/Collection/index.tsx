import React from 'react';
import {FlatList, Image, StatusBar, StyleSheet} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {RootStackScreenProps} from '../../navigation/types';
import SafeView from '../../components/SafeView';
import ItemCardPokemon from '../../components/ItemCardPokemon';

import {useAppSelector} from '../../store';
import {
  selectGenerationById,
  selectAllPokemon,
} from '../../store/reducers/pokemon';
import Details from '../Card/Details';

//#region HomeScreen

const CollectionScreen = ({route}: RootStackScreenProps<'Collection'>) => {
  const screenOffsetTop = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const headerHeight = screenOffsetTop - statusBarHeight;

  const {generationId: id} = route.params;
  const generation = useAppSelector(selectGenerationById(id));
  const pokemon = useAppSelector(selectAllPokemon(generation.pokemon));

  return (
    <>
      <StatusBar translucent backgroundColor="#fff0" barStyle="dark-content" />

      <SafeView bottom={false}>
        <Image
          source={require('./../../data/logo_w.png')}
          tintColor={'#000'}
          style={[
            styles.headerLogoBackground,
            {
              top: -100 + statusBarHeight + headerHeight * 0.5,
              right: -100 + 25 + 3,
            },
          ]}
        />
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={pokemon}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ItemCardPokemon data={item} />}
          numColumns={2}
        />
      </SafeView>
      <Details hide />
    </>
  );
};

const styles = StyleSheet.create({
  headerLogoBackground: {
    position: 'absolute',
    opacity: 0.1,
    width: 200,
    height: 200,
  },
  list: {
    paddingHorizontal: 8,
    // backgroundColor: 'pink',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: StatusBar.currentHeight,
  },
});

//#endregion

export default CollectionScreen;
