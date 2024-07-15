import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, FetchApiResponse } from '../common/types/apiTypes';

const baseUrl = process.env.REACT_APP_API_URL!;

const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints(builder) {
    return {
      fetchArticles: builder.query<FetchApiResponse<Article[]>, void>({
        query: () => {
          return {
            url: '/articles',
            method: 'GET',
            params: {
              'parkCode': 'grsm',
            }
          }
        },
      }),
    }
  }
});

export const { useFetchArticlesQuery } = articlesApi;
export { articlesApi };