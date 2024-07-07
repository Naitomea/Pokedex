import React from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GenerationData, PokemonData} from '../../types';
import styles from './styles';
import ItemCard from '../ItemCard';
import {useAppSelector} from '../../store';
import {selectAllPokemon} from '../../store/reducers/pokemon';

export type ItemCardGenerationProps = {
  data: GenerationData;
};

const ItemCardGeneration = ({data}: ItemCardGenerationProps) => {
  const navigation = useNavigation();

  const pokemon = useAppSelector(selectAllPokemon(data.pokemon));
  const pokemonCount = pokemon.length;
  const pokemonCaptured = pokemon.filter(p => p.captured).length;
  const progressPercent = Math.floor((pokemonCaptured / pokemonCount) * 100);

  const pokemonStarter = (
    [
      pokemon.find(p => p.types[0] === 'grass'),
      pokemon.find(p => p.types[0] === 'fire'),
      pokemon.find(p => p.types[0] === 'water'),
    ].filter(p => p) as PokemonData[]
  ).sort((a, b) => a.order - b.order);

  return (
    <ItemCard
      name={data.name}
      centerTitle={true}
      onPress={() =>
        navigation.navigate('Collection', {
          generationId: data.id,
          title: data.name,
        })
      }
      checked={pokemonCaptured === pokemonCount}
      // new={data.new}>
    >
      <View style={styles.images}>
        {pokemonStarter.map((p, i, a) => (
          <Image
            key={p.id}
            src={p.img}
            style={[
              styles.image,
              {
                transform: [
                  {
                    translateX:
                      10 * (a.length * 0.5 - a.length * (i / (a.length - 1))),
                  },
                  {
                    scale:
                      1 + (1 - Math.abs(i / (a.length - 1) - 0.5) / 0.5) * 0.1,
                  },
                ],
                zIndex: (1 - Math.abs(i / (a.length - 1) - 0.5) / 0.5) * 10,
              },
            ]}
          />
        ))}
      </View>
      {/* <View style={styles.informations}>
        <Text style={styles.percentage}>{progressPercent}%</Text>
        <Text style={styles.count}>
          {pokemonCaptured}/{pokemonCount}
        </Text>
      </View> */}
    </ItemCard>
  );
};

export default ItemCardGeneration;
