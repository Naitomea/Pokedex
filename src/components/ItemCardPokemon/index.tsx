import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {PokemonData} from '../../types';
import ItemCard from '../ItemCard';
import Pills from '../Pills';
import {getPokemonColor} from '../../utils';

import styles from './styles';

export type ItemCardPokemonProps = {
  data: PokemonData;
};

const ItemCardPokemon = ({data}: ItemCardPokemonProps) => {
  const navigation = useNavigation();

  return (
    <ItemCard
      index={data.order}
      sharedKey={data.id}
      mode="dark"
      name={data.name}
      text={`#${data.id.toString().padStart(3, '0')}`}
      img={data.img}
      color={getPokemonColor(data)}
      onPress={() => navigation.navigate('Card', {pokemonId: data.id})}
      discovered={data.discovered}
      checked={data.captured}
      new={data.new}>
      <Pills
        style={styles.pills}
        items={!data.discovered ? '???' : data.types}
        direction="column"
        sharedKey={data.id}
      />
    </ItemCard>
  );
};

export default ItemCardPokemon;
