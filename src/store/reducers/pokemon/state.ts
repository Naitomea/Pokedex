import {GenerationData, PokemonData} from '../../../types';

export interface PokemonState {
  generations: GenerationData[];
  pokemon: {[id: number]: PokemonData};
}

const initialState: PokemonState = {
  generations: [],
  pokemon: {},
};

export default initialState;
