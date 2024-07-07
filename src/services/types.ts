import {POKEMON_TYPE_COLORS} from '../constants';

export type IdOrName = number | string;
export type GenerationResponse = {name: string; pokemon_species: string[]};
export type PokemonSpeciesResponse = {
  id: number;
  name: string;
  description: string;
  eggGroups: string[];
  gender?: {male: number; female: number};
};
export type PokemonResponse = {
  img: string;
  types: (keyof typeof POKEMON_TYPE_COLORS)[];
  height: number; // Decimeters
  weight: number; // Hectograms
  baseEXP: number;
};
