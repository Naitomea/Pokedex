import {PayloadAction} from '@reduxjs/toolkit';
import {PokemonState} from './state';
import {PokemonData} from '../../../types';

const reducers = {
  addGeneration(
    state: PokemonState,
    action: PayloadAction<{name: string; pokemon: number[]}>,
  ) {
    state.generations.push({
      id: state.generations.length,
      name: action.payload.name,
      pokemon: action.payload.pokemon,
    });
  },
  addPokemon(state: PokemonState, action: PayloadAction<PokemonData>) {
    state.pokemon[action.payload.id] = action.payload;
  },
};

export default reducers;
