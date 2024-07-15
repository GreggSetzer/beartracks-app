import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { articlesApi } from './ArticlesApi';
import { favoritesApi } from './FavoritesApi';
import { featuredApi } from './FeaturedApi';
import { parksApi } from './ParksApi';
import selectedParkReducer from './SelectedParkSlice';

export const store = configureStore({
  reducer: {
    selectedPark: selectedParkReducer,
    [parksApi.reducerPath]: parksApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [featuredApi.reducerPath]: featuredApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(parksApi.middleware)
      .concat(featuredApi.middleware)
      .concat(favoritesApi.middleware)
      .concat(articlesApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchParksQuery } from './ParksApi';
export { useFetchArticlesQuery } from './ArticlesApi';
export { setSelectedPark } from './SelectedParkSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
