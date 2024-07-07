import React from 'react';
import {FlatList, Image, StatusBar, StyleSheet} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {RootStackScreenProps} from '../../navigation/types';
import SafeView from '../../components/SafeView';

import {useAppSelector} from '../../store';
import {selectAllGenerations} from '../../store/reducers/pokemon';
import ItemCardGeneration from '../../components/ItemCardGeneration';

//#region Fetching Helpers

// function fetchPokemon(url: string) {
//   return new Promise(async (res: (v: PokemonData) => void, rej) => {
//     try {
//       // console.log(`Updating #${speciesData.id}... [1/2]`);
//       const speciesFetch = await fetch(url);
//       const speciesData = await speciesFetch.json();

//       // console.log(`Updating #${speciesData.id}... [2/2]`);
//       const pokemonFetch = await fetch(
//         `https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`,
//       );
//       const pokemonData = await pokemonFetch.json();

//       res({
//         id: speciesData.id,
//         name: speciesData.names[8].name,
//         types: pokemonData.types.map((type: any) => type.type.name),
//         img: pokemonData.sprites.other['official-artwork'].front_default,
//         discovered: Math.random() > 0.65,
//         captured: Math.random() > 0.4,
//         new: Math.random() > 0.2,
//       });
//     } catch (err) {
//       rej(err);
//     }
//   });
// }

// function fetchAllData() {
//   return new Promise(async (res: (v: PokemonData[]) => void, rej) => {
//     try {
//       // console.log('Updating Gen 1...');
//       const genFetch = await fetch(
//         `https://pokeapi.co/api/v2/generation/${1}/`,
//       );
//       const genData = await genFetch.json();

//       // console.log('Updating Pokemon...');
//       const pokemonData = await Promise.all(
//         genData.pokemon_species.map((d: {name: string; url: string}) =>
//           fetchPokemon(d.url),
//         ),
//       );

//       res(pokemonData.sort((a, b) => a.id - b.id));
//     } catch (err) {
//       rej(err);
//     }
//   });
// }

//#endregion

//#region HomeScreen

const CollectionsScreen = ({}: RootStackScreenProps<'Collections'>) => {
  const screenOffsetTop = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const headerHeight = screenOffsetTop - statusBarHeight;

  const generations = useAppSelector(selectAllGenerations);

  return (
    <>
      <StatusBar translucent backgroundColor="#fff0" barStyle="dark-content" />
      <SafeView bottom={false}>
        <Image
          source={require('./../../data/logo_w.png')}
          tintColor={'#000'}
          style={StyleSheet.compose(styles.headerLogoBackground, {
            top: -100 + statusBarHeight + headerHeight * 0.5,
            right: -100 + 25 + 3,
          })}
        />
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={generations}
          keyExtractor={item => item.name}
          renderItem={({item}) => <ItemCardGeneration data={item} />}
          numColumns={2}
        />
      </SafeView>
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

export default CollectionsScreen;
