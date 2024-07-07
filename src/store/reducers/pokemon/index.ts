import {createSlice} from '@reduxjs/toolkit';

import initialState from './state';
import reducers from './reducers';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers,
});

export const {addPokemon, addGeneration} = pokemonSlice.actions;
export default pokemonSlice.reducer;
export * from './selectors';
