import React from 'react';
import { Favorite } from '../../../common/types/apiTypes';

interface FavoritesListItemProps {
  parkName: string;
  favorites: Favorite[];
  onRemove: (favorite: Favorite) => void;
}
const FavoritesListItem = ({ favorites, onRemove }: FavoritesListItemProps) => {
  const placeholderImage = {
    altText: 'Silhouette of pine trees behind a tent',
    url: '/images/no-campsite.jpg',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((favorite: Favorite) => (
        <div
          key={favorite.campgroundId}
          className="border rounded-lg p-4 shadow-lg"
        >
          <img
            src={favorite.campgroundImageUrl || placeholderImage.url}
            alt={favorite.campgroundImageAltText || placeholderImage.altText}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-xl font-bold mb-2">{favorite.campgroundName}</h3>
          <p className="text-gray-700 mb-2">{favorite.parkName}</p>
          <button
            onClick={() => onRemove(favorite)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove Favorite
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesListItem;
