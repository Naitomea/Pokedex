import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, BackHandler, Pressable, Text} from 'react-native';
import {BaseQueryFn, TypedLazyQueryTrigger} from '@reduxjs/toolkit/query/react';

import {AppDispatch, useAppDispatch, useAppSelector} from '../../store';
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
import {
  addGeneration,
  addPokemon,
  getGenerationCount,
} from '../../store/reducers/pokemon';

import styles from './styles';
import {PokemonData} from '../../types';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  for (let i = 0; i < (__DEV__ ? 1 : generationsData.length); i++) {
    const generationName = generationsData[i];
    const generationData = await getGenerationByIdOrName(
      generationName,
    ).unwrap();

    // Fetch each pokemon
    let allPokemon: PokemonData[] = [];

    for (
      let j = 0,
        totalPokemon = __DEV__ ? 10 : generationData.pokemon_species.length;
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
  const [small, setSmall] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const [getGenerations] = useLazyGetGenerationsQuery();
  const [getGenerationByIdOrName] = useLazyGetGenerationByIdOrNameQuery();
  const [getPokemonSpecies] = useLazyGetPokemonSpeciesByIdOrNameQuery();
  const [getPokemon] = useLazyGetPokemonByIdOrNameQuery();

  const generationCount = useAppSelector(getGenerationCount);
  const locked = useMemo(() => generationCount === 0, [generationCount]);
  useMemo(() => generationCount === 1 && setSmall(true), [generationCount]);

  useEffect(() => {
    // Back Handling
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!locked && !small) {
          setSmall(true);
          return true;
        }
        return false;
      },
    );
    const removeBackHandler = () => backHandler.remove();

    // Fetching
    if (progress !== 0) {
      return removeBackHandler;
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

    return removeBackHandler;
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
    generationCount,
    locked,
    small,
  ]);

  const handlePress = () => {
    setSmall(!small);
  };

  return (
    updating &&
    (small ? (
      <AnimatedPressable
        key="small"
        style={styles.smallOverlay}
        entering={FadeInDown}
        exiting={FadeOutDown}
        onPress={handlePress}>
        <ActivityIndicator color={'#FFF'} size={'small'} />
        <Text style={styles.text}>{Math.floor(progress * 100)}%</Text>
      </AnimatedPressable>
    ) : (
      <AnimatedPressable
        key="large"
        style={styles.overlay}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={handlePress}
        disabled={locked}>
        <ActivityIndicator
          style={styles.progress}
          color={'#FFF'}
          size={'large'}
        />
        <Text style={styles.text}>
          Updating data{currentId > -1 ? ` #${currentId}` : ''}...
        </Text>
        <Text style={styles.text}>{Math.floor(progress * 100)}%</Text>
      </AnimatedPressable>
    ))
  );
};

export default DataUpdater;
