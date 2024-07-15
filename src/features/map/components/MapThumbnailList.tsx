import { useMemo } from 'react';
import { ImageInfo } from '../../../common/types/apiTypes';

interface MapThumbnailListProps {
  images: ImageInfo[];
  handleOnClick: (previewImage: ImageInfo) => void;
}

const MapThumbnailList = ({ images, handleOnClick }: MapThumbnailListProps) => {
  const imageList = useMemo(() => {
    return images.map((image: ImageInfo) => {
      return (
        <li key={image.url}>
          <button onClick={() => handleOnClick(image)}>
            <img
              src={image.url}
              alt={image.altText ?? image.title}
              title={image.title}
              className="w-48 h-auto rounded"
            />
          </button>
        </li>
      );
    });
  }, [images, handleOnClick]);

  if (!images.length) {
    return <div className="text-gray-500">No images available</div>;
  }

  return <ul className="grid grid-cols-4 gap-3">{imageList}</ul>;
};

export default MapThumbnailList;
