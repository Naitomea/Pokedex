import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {PokemonData} from '../../../types';
import {emptyPokemon} from '../../../constants';

export const selectAllGenerations = (state: RootState) =>
  state.pokemon.generations;
export const selectGenerationById = (id: number) => (state: RootState) =>
  state.pokemon.generations[id];
export const selectAllPokemon = (pokemonIds: number[]) =>
  createSelector(
    [(state: RootState) => state.pokemon.pokemon, _ => pokemonIds],
    (pokemon, ids) => ids.map(id => pokemon[id]),
  );
export const selectPokemon =
  (pokemonId: number) =>
  (state: RootState): PokemonData => {
    return pokemonId in state.pokemon.pokemon
      ? state.pokemon.pokemon[pokemonId]
      : emptyPokemon;
  };
