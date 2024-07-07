import {POKEMON_TYPE_COLORS} from '../constants';

export type PokemonData = {
  id: number;
  name: string;
  img: string;
  types: (keyof typeof POKEMON_TYPE_COLORS)[];

  generationId: number;
  order: number;

  description: string;
  /** in cm */
  height: number;
  /** in kg */
  weight: number;

  gender?: {male: number; female: number};
  eggGroups: string[];

  baseEXP: number;

  discovered: boolean;
  captured?: boolean;
  new?: boolean;
};

export type GenerationData = {
  id: number;
  name: string;
  pokemon: number[];
};
