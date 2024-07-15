import React, { Fragment } from 'react';
import { useRemoveFavoriteMutation } from '../../../app/FavoritesApi';
import useAuthToken from '../../../common/hooks/useAuthToken';
import useFavorites from '../../../common/hooks/useFavorites';
import { Favorite } from '../../../common/types/apiTypes';
import FavoritesListItem from './FavoritesListItem';

const FavoritesList = () => {
  // Group campgrounds by parkName using a Map
  const parksMap = new Map<string, Favorite[]>();
  const { token, user } = useAuthToken();
  const { favorites } = useFavorites(user, token);
  const [removeFavorite] = useRemoveFavoriteMutation();

  favorites?.items?.forEach((favorite) => {
    if (!parksMap.has(favorite.parkName)) {
      parksMap.set(favorite.parkName, []);
    }
    parksMap.get(favorite.parkName)!.push(favorite);
  });

  const handleRemoveFavorite = ({ userId, campgroundId }: Favorite) => {
    removeFavorite({
      userId,
      campgroundId,
      token,
    });
  };

  return (
    <>
      {Array.from(parksMap.entries()).map(([parkName, favorites]) => (
        <Fragment key={parkName}>
          <h2 className="text-2xl font-bold my-8">{parkName}</h2>
          <FavoritesListItem
            key={parkName}
            favorites={favorites}
            parkName={parkName}
            onRemove={handleRemoveFavorite}
          />
        </Fragment>
      ))}
    </>
  );
};

export default FavoritesList;
