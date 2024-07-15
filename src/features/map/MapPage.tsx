import { useAuth0 } from '@auth0/auth0-react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useAddFavoriteMutation,
  useFetchFavoritesQuery,
  useRemoveFavoriteMutation,
} from '../../app/FavoritesApi';
import { RootState } from '../../app/store';
import CustomModal from '../../common/components/CustomModal';
import Layout from '../../common/components/Layout';
import { useViewport } from '../../common/contexts/ViewportProvider';
import usePosition from '../../common/hooks/usePosition';
import {
  Campground,
  Favorite,
  ImageInfo,
  SelectedPark,
} from '../../common/types/apiTypes';
import CustomMap from './components/CustomMap';
import MapCard from './components/MapCard';

const MapPage = () => {
  const selectedPark: SelectedPark | null = useSelector(
    (state: RootState) => state.selectedPark
  );

  const [position, setPosition] = usePosition(selectedPark);
  const [previewMap, setPreviewMap] = useState(false);
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    if (user) {
      fetchToken();
    }
  }, [user, getAccessTokenSilently]);

  const {
    data: favorites,
    error: favoritesError,
    isLoading: isFavoritesLoading,
  } = useFetchFavoritesQuery(
    { userId: user?.sub || '', token: token || '' },
    {
      skip: !user?.sub || !token, // Skip the query if userId or token is not available
    }
  );

  useEffect(() => {
    if (!selectedPark?.featuredPark) {
      navigate('/');
    }
  }, [navigate, selectedPark]);

  // For testing purposes only. See Testing useCallback with useRef video
  const previousHandleMapUpdateRef = useRef<
    ((campsite: Campground) => void) | null
  >(null);

  const handleMapUpdate = useCallback(
    (campsite: Campground) => {
      setPosition({
        lat: parseFloat(campsite.latitude ?? '0'),
        lng: parseFloat(campsite.longitude ?? '0'),
      });

      if (isMobile) {
        setPreviewMap(true);
      }
    },
    [setPosition, setPreviewMap, isMobile]
  );

  const toggleFavorite = async (campground: Campground) => {
    if (!user?.sub) return;

    const isFavorite = favorites?.items?.some((favorite: Favorite) => {
      return favorite.campgroundId === campground.id;
    });

    const placeholderImage: ImageInfo = {
      altText: 'Silhouette of pine trees behind a tent',
      url: '/images/no-campsite.jpg',
    };
    let image: ImageInfo = campground?.images?.length
      ? campground.images[0]
      : placeholderImage;

    const favorite: Favorite = {
      userId: user.sub,
      campgroundId: campground.id,
      campgroundName: campground.name ?? '',
      campgroundImageAltText: image.altText,
      campgroundImageUrl: image.url,
      campgroundUrl: campground.url ?? '',
      parkId: selectedPark?.featuredPark?.id ?? '',
      parkName: selectedPark?.featuredPark?.name ?? '',
    };

    try {
      if (isFavorite) {
        await removeFavorite({
          userId: user.sub,
          token: token!,
          campgroundId: campground.id,
        });
      } else {
        await addFavorite({ userId: user.sub, token: token!, favorite });
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  // Check if the function reference has changed
  useEffect(() => {
    if (previousHandleMapUpdateRef.current !== handleMapUpdate) {
      console.log('handleMapUpdate reference changed');
      previousHandleMapUpdateRef.current = handleMapUpdate;
    } else {
      console.log('handleMapUpdate reference is the same');
    }
  }, [handleMapUpdate]);

  const campgroundsList = selectedPark?.featuredParkDetails?.campgrounds.map(
    (campground: Campground) => (
      <MapCard
        key={campground.id}
        campground={campground}
        favorite={
          favorites?.items.some(
            (favorite: Favorite) => favorite.campgroundId === campground.id
          ) || false
        }
        handleOnClick={handleMapUpdate}
        handleFavoriteOnClick={toggleFavorite}
      />
    )
  );

  const handleClose = useCallback(() => {
    setPreviewMap(false);
  }, []);


  if (isAuthLoading || isFavoritesLoading) {
    return <div>Loading...</div>;
  }

  if (favoritesError) {
    console.log(favoritesError);
    return <div>Error loading favorites: {'Something went wrong'}</div>;
  }

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
      <Layout mainClassName="overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse h-full border border-t-gray-200">
          <div className="h-2/3 lg:h-auto lg:w-1/2 xl:w-1/3 overflow-y-auto bg-gray-50 p-4">
            <div className="space-y-4">{campgroundsList}</div>
          </div>
          <div className="h-1/3 lg:h-auto lg:w-1/2 xl:w-2/3">
            <div className="flex items-center justify-center h-full">
              <CustomMap position={position} />
            </div>
          </div>
        </div>
        {previewMap && (
          <CustomModal onClose={handleClose}>
            <CustomMap position={position} />
          </CustomModal>
        )}
      </Layout>
    </APIProvider>
  );
};

export default MapPage;
