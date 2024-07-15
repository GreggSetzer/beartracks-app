import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

interface FavoriteButtonProps {
  campgroundId: string;
  handleClick: () => void;
  isFavorite: boolean;
}
const FavoriteButton = ({ isFavorite, handleClick }: FavoriteButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center hover:underline hover:text-blue-500"
    >
      {isFavorite && (
        <IoMdHeart aria-hidden={true} className="text-3xl text-red-500" />
      )}
      {!isFavorite && (
        <IoMdHeartEmpty aria-hidden={true} className="text-3xl text-red-500" />
      )}{' '}
      {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
