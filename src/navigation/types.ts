import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Collections: undefined;
  Collection: {generationId: number; title: string};
  Card: {pokemonId: number};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
