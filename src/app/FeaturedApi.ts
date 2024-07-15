import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FeaturedPark } from '../common/types/apiTypes';

const baseUrl = process.env.REACT_APP_API_URL!;

const featuredApi = createApi({
  reducerPath: 'featured',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints(builder) {
    return {
      fetchFeatured: builder.query<FeaturedPark, string>({
        query: (parkCode: string) => {
          return {
            url: '/featured',
            method: 'GET',
            params: {
              parkCode,
            }
          }
        },
      }),
    }
  }
});

export const { useFetchFeaturedQuery } = featuredApi;
export { featuredApi };