import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Favorite, FetchApiResponse } from '../common/types/apiTypes';

const baseUrl = process.env.REACT_APP_API_URL!;

const favoritesApi = createApi({
  reducerPath: 'favorites',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['Favorites'],
  endpoints(builder) {
    return {
      fetchFavorites: builder.query<
        FetchApiResponse<Favorite[]>,
        { userId: string; token: string }
      >({
        providesTags: ['Favorites'],
        query: ({ userId, token }): FetchArgs => ({
          url: '/favorites',
          method: 'GET',
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
      addFavorite: builder.mutation<
        void,
        { userId: string; token: string; favorite: Favorite }
      >({
        invalidatesTags: ['Favorites'],
        query: ({ userId, token, favorite }) => {
          return {
            url: `/favorites`,
            method: 'POST',
            body: {
              ...favorite,
              userId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
      }),
      removeFavorite: builder.mutation<
        void,
        { userId: string; token: string; campgroundId: string }
      >({
        invalidatesTags: ['Favorites'],
        query: ({ userId, token, campgroundId }) => {
          return {
            url: `/favorites`,
            method: 'DELETE',
            body: {
              campgroundId,
              userId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesApi;
export { favoritesApi };
