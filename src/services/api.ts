import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  GenerationResponse,
  IdOrName,
  PokemonResponse,
  PokemonSpeciesResponse,
} from './types';
// import type {CreateProfileArgs, ProfileAvailableArgs} from './types';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2',
  }),
  endpoints: builder => ({
    getGenerations: builder.query<string[], void>({
      query: () => '/generation',
      transformResponse: (responseData: any): string[] =>
        responseData.results.map((d: any) => d.name),
    }),

    getGenerationByIdOrName: builder.query<GenerationResponse, IdOrName>({
      query: generationIdOrName => `/generation/${generationIdOrName}`,
      transformResponse: (responseData: any): GenerationResponse => ({
        name: responseData.names[6].name,
        pokemon_species: responseData.pokemon_species.map((p: any) => p.name),
      }),
    }),

    getPokemonSpeciesByIdOrName: builder.query<
      PokemonSpeciesResponse,
      IdOrName
    >({
      query: pokemonSpeciesIdOrName =>
        `/pokemon-species/${pokemonSpeciesIdOrName}`,
      transformResponse: (responseData: any): PokemonSpeciesResponse => ({
        id: responseData.id,
        name: responseData.names[6].name,
        description: (
          responseData.flavor_text_entries.find(
            (text: any) =>
              ['ruby', 'platinum', 'soulsilver'].includes(text.version.name) &&
              text.language.name === 'en',
          ) ||
          responseData.flavor_text_entries.find(
            (text: any) => text.language.name === 'en',
          ) || {flavor_text: ''}
        ).flavor_text
          .replace(/(\r\n|\n|\r|\f)/gm, ' ')
          .trim(),
        eggGroups: responseData.egg_groups.map((d: any) => d.name),
        gender:
          responseData.gender_rate !== -1
            ? {
                female: (100 / 8) * responseData.gender_rate,
                male: 100 - (100 / 8) * responseData.gender_rate,
              }
            : undefined,
      }),
    }),

    getPokemonByIdOrName: builder.query<PokemonResponse, IdOrName>({
      query: pokemonIdOrName => `/pokemon/${pokemonIdOrName}`,
      transformResponse: (responseData: any): PokemonResponse => ({
        img: responseData.sprites.other['official-artwork'].front_default,
        types: responseData.types.map((t: any) => t.type.name),
        height: responseData.height,
        weight: responseData.weight,
        baseEXP: responseData.base_experience,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetGenerationsQuery,
  useLazyGetGenerationByIdOrNameQuery,
  useLazyGetPokemonSpeciesByIdOrNameQuery,
  useLazyGetPokemonByIdOrNameQuery,
} = api;
