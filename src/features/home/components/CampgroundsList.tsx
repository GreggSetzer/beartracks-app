import { ImageCard } from '@greggsetzer/navigator-demo-ui';
import { Campground, ImageInfo } from '../../../common/types/apiTypes';

interface CampgroundsListProps {
  campgrounds?: Campground[];
}

const CampgroundsList = ({ campgrounds = [] }: CampgroundsListProps) => {
  const campgroundsList = campgrounds.map((campground: Campground) => {
    const placeholderImage: ImageInfo = {
      altText: 'Silhouette of pine trees behind a tent',
      url: '/images/no-campsite.jpg',
    };
    let image: ImageInfo = campground?.images?.length
      ? campground.images[0]
      : placeholderImage;

    return (
      <ImageCard
        key={campground.id}
        title={campground.name ?? ''}
        description={campground.description ?? ''}
        linkUrl={campground.url ?? ''}
        imgSrc={image?.url ?? ''}
        alt={image?.altText ?? ''}
        newBrowserTab={true}
      />
    );
  });

  return <>{campgroundsList}</>;
};

export default CampgroundsList;
