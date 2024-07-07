import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {BaseQueryFn, TypedLazyQueryTrigger} from '@reduxjs/toolkit/query/react';

import {AppDispatch, useAppDispatch} from '../../store';
import {
  GenerationResponse,
  IdOrName,
  PokemonResponse,
  PokemonSpeciesResponse,
} from '../../services/types';
import {
  useLazyGetGenerationByIdOrNameQuery,
  useLazyGetGenerationsQuery,
  useLazyGetPokemonByIdOrNameQuery,
  useLazyGetPokemonSpeciesByIdOrNameQuery,
} from '../../services/api';
import {addGeneration, addPokemon} from '../../store/reducers/pokemon';

import styles from './styles';
import {PokemonData} from '../../types';

async function fetchData(
  getGenerations: TypedLazyQueryTrigger<string[], void, BaseQueryFn>,
  getGenerationByIdOrName: TypedLazyQueryTrigger<
    GenerationResponse,
    IdOrName,
    BaseQueryFn
  >,
  getPokemonSpeciesByIdOrName: TypedLazyQueryTrigger<
    PokemonSpeciesResponse,
    IdOrName,
    BaseQueryFn
  >,
  getPokemonByIdOrName: TypedLazyQueryTrigger<
    PokemonResponse,
    IdOrName,
    BaseQueryFn
  >,
  dispatch: AppDispatch,
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setCurrentId: React.Dispatch<React.SetStateAction<number>>,
) {
  // Clear tracking
  setCurrentId(-1);
  setProgress(0);
  setUpdating(true);

  // Fetch ALL generations
  const generationsData = await getGenerations().unwrap();

  // Fetch each generation
  for (let i = 0; i < (__DEV__ ? 1 : 1/* generationsData.length */); i++) {
    const generationName = generationsData[i];
    const generationData = await getGenerationByIdOrName(
      generationName,
    ).unwrap();

    // Fetch each pokemon
    let allPokemon: PokemonData[] = [];

    for (
      let j = 0,
        totalPokemon = __DEV__ ? 10 : 10/* generationData.pokemon_species.length */;
      j < totalPokemon;
      j++
    ) {
      const pokemonName = generationData.pokemon_species[j];
      const pokemonSpeciesData = await getPokemonSpeciesByIdOrName(
        pokemonName,
      ).unwrap();

      const pokemonId = pokemonSpeciesData.id;
      const pokemonData = await getPokemonByIdOrName(pokemonId).unwrap();

      // Prepare Pokemon
      const isDiscovered = Math.random() < 0.85; // TEMP
      allPokemon.push({
        id: pokemonSpeciesData.id,
        name: pokemonSpeciesData.name,
        types: pokemonData.types,
        img: pokemonData.img,

        generationId: i,
        order: allPokemon.length,

        description: pokemonSpeciesData.description,
        height: pokemonData.height * 10,
        weight: pokemonData.weight / 10,

        gender: pokemonSpeciesData.gender,
        eggGroups: pokemonSpeciesData.eggGroups,

        baseEXP: pokemonData.baseEXP,

        discovered: true,
        // discovered: isDiscovered,
        captured: isDiscovered && Math.random() < 0.9,
        new: isDiscovered && Math.random() < 0.2,
      });

      // Update progress
      const progressByGeneration = 1 / generationsData.length;
      const baseGenerationProgress = i * progressByGeneration;
      const currentGenerationProgress = (j + 1) / totalPokemon;

      setProgress(
        Math.max(
          0,
          Math.min(
            1,
            baseGenerationProgress +
              currentGenerationProgress * progressByGeneration,
          ),
        ),
      );
      setCurrentId(pokemonId);
    }

    // Sort Pokemon
    allPokemon = allPokemon
      .sort((a, b) => a.id - b.id)
      .map((p, order) => ({...p, order}));

    // Add Pokemon
    for (const pokemon of allPokemon) {
      dispatch(addPokemon(pokemon));
    }

    // Add Generation
    dispatch(
      addGeneration({
        name: generationData.name,
        pokemon: allPokemon.map(p => p.id),
      }),
    );
  }

  setProgress(1);
  setUpdating(false);
}

const DataUpdater = () => {
  const [updating, setUpdating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentId, setCurrentId] = useState<number>(-1);

  const [getGenerations] = useLazyGetGenerationsQuery();
  const [getGenerationByIdOrName] = useLazyGetGenerationByIdOrNameQuery();
  const [getPokemonSpecies] = useLazyGetPokemonSpeciesByIdOrNameQuery();
  const [getPokemon] = useLazyGetPokemonByIdOrNameQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (progress !== 0) {
      return;
    }

    fetchData(
      getGenerations,
      getGenerationByIdOrName,
      getPokemonSpecies,
      getPokemon,
      dispatch,
      setUpdating,
      setProgress,
      setCurrentId,
    );
  }, [
    getGenerations,
    getGenerationByIdOrName,
    getPokemonSpecies,
    getPokemon,
    dispatch,
    setUpdating,
    setProgress,
    setCurrentId,
    progress,
  ]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={updating}
      statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <ActivityIndicator style={styles.progress} size={'large'} />
        <Text>Updating data{currentId > -1 ? ` #${currentId}` : ''}...</Text>
        <Text>{Math.floor(progress * 100)}%</Text>
      </View>
    </Modal>
  );
};

export default DataUpdater;
