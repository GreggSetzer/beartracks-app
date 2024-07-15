import { useFetchFavoritesQuery } from '../../app/FavoritesApi';

const useFavorites = (user: any, token: string) => {
  const {
    data: favorites,
    error: favoritesError,
    isLoading: isFavoritesLoading,
  } = useFetchFavoritesQuery(
    { userId: user?.sub || '', token },
    {
      skip: !user?.sub || !token, // Skip the query if userId or token is not available
    }
  );

  return { favorites, favoritesError, isFavoritesLoading };
};

export default useFavorites;
