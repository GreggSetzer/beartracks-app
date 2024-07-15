import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchApiResponse, Park } from '../common/types/apiTypes';

const baseUrl = process.env.REACT_APP_API_URL!;

const parksApi = createApi({
  reducerPath: 'parks',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints(builder) {
    return {
      fetchParks: builder.query<FetchApiResponse<Park[]>, void>({
        query: () => {
          return {
            url: '/parks',
            method: 'GET',
          }
        },
      }),
    }
  }
});

export const { useFetchParksQuery } = parksApi;
export { parksApi };