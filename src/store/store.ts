import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {api} from '../services/api';
import pokemonReducer from './reducers/pokemon';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    pokemon: pokemonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
