import {PokemonData} from '../types';
import {POKEMON_TYPE_COLORS} from '../constants';

export const getPokemonColor = (pokemon: PokemonData) =>
  pokemon.discovered
    ? POKEMON_TYPE_COLORS[pokemon.types[0]]
    : POKEMON_TYPE_COLORS.unknown;
