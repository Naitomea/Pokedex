import {PokemonData} from '../types';

export const emptyPokemon: PokemonData = {
  id: -1,
  name: '',
  img: '',
  types: [],

  generationId: -1,
  order: -1,

  description: '',
  height: 0,
  weight: 0,

  eggGroups: [],

  baseEXP: 0,

  discovered: false,
};
