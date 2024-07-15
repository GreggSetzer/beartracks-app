import { useState } from 'react';
import { MdLocationPin } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import { Campground, ImageInfo } from '../../../common/types/apiTypes';
import FavoriteButton from './FavoriteButton';
import MapThumbnailList from './MapThumbnailList';

interface MapCardProps {
  campground: Campground;
  favorite: boolean;
  handleOnClick: (campground: Campground) => void;
  handleFavoriteOnClick: (campground: Campground) => void;
}

const MapCard = ({
  campground,
  handleOnClick,
  handleFavoriteOnClick,
  favorite,
}: MapCardProps) => {
  const [previewImage, setPreviewImage] = useState<ImageInfo | null>(null);
  const placeholderImage: ImageInfo = {
    altText: 'Silhouette of pine trees behind a tent',
    url: '/images/no-campsite.jpg',
  };
  let image: ImageInfo = campground?.images?.length
    ? campground.images[0]
    : placeholderImage;
  const campingFee = campground?.fees?.length
    ? `$${campground.fees[0].cost}`
    : 'Cost not available';

  return (
    <div className="mb-4 border-b border-b-gray-500">
      <div className="md:flex mb-2 text-xl font-medium">
        <p className="flex-1">
          <button
            className="hover:underline hover:text-blue-500 flex"
            onClick={() => {
              handleOnClick(campground);
            }}
          >
            {campground.name}
          </button>
        </p>
        <span>{campingFee}</span>
      </div>
      <div className="2xl:flex">
        <div>
          <button
            onClick={() => {
              setPreviewImage(image);
            }}
            className="2xl:w-64 2xl:mr-3 mb-4 2xl:mb-0"
          >
            <img
              src={image.url}
              alt={image.altText}
              className="w-full h-auto rounded-lg object-cover border border-gray-500 hover:drop-shadow-lg mb-2"
            />
          </button>

          <button
            onClick={() => {
              handleOnClick(campground);
            }}
            className="flex items-center hover:underline hover:text-blue-500 lg:mb-4"
          >
            <MdLocationPin
              aria-hidden={true}
              className="text-3xl text-red-500"
            />{' '}
            Locate on Map
          </button>

          <FavoriteButton
            campgroundId={campground.id}
            handleClick={() => {
              handleFavoriteOnClick(campground);
            }}
            isFavorite={favorite}
          />
        </div>
        <div>
          <MapThumbnailList
            images={campground.images ?? []}
            handleOnClick={setPreviewImage}
          />
          <ul className="mt-3">
            <li className="bg-gray-50 drop-shadow-md text-black rounded px-3 py-4 mb-3">
              Reservable Campsites: {campground.numberOfSitesReservable}
            </li>
          </ul>
        </div>
      </div>
      <div className="my-8">
        <p className="flex-1 mb-2">
          <span className="text-gray-600 block mb-3">
            {campground.description}
          </span>
          <strong className="font-medium block">Accessibility:</strong>
          <span className="text-gray-600">
            {campground.accessibility?.adaInfo}
            {campground.accessibility?.adaInfo.length === 0 &&
              'No information available.'}
          </span>
        </p>
        <p>
          <a
            href={campground.url}
            className="hover:underline text-blue-500 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more on Recreation.gov
          </a>
        </p>
      </div>

      {/* Use previewImage !== null to avoid 2 pieces of state (open/closed state and the image itself) */}
      {previewImage && (
        <Modal
          open={true}
          onClose={() => {
            setPreviewImage(null);
          }}
          center
          showCloseIcon={false}
        >
          <img src={previewImage?.url} alt={previewImage?.altText} />
          <div className="py-3 border-t-2 border-gray-700 text-center">
            <button
              className="px-4 py-2"
              onClick={() => {
                setPreviewImage(null);
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MapCard;
