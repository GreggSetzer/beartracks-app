import { SkeletonGrid } from '@greggsetzer/navigator-demo-ui';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchFeaturedQuery } from '../../app/FeaturedApi';
import { useFetchParksQuery } from '../../app/ParksApi';
import { selectParkCode, setSelectedPark } from '../../app/SelectedParkSlice';
import Layout from '../../common/components/Layout';
import { Park } from '../../common/types/apiTypes';
import ArticlesList from './components/ArticlesList';
import CampgroundsList from './components/CampgroundsList';
import HeroSearch from './components/HeroSearch';

const HomePage = () => {
  const [featuredParkCode, setFeaturedParkCode] = useState(
    useSelector(selectParkCode) ?? 'grsm'
  );
  const parksData = useFetchParksQuery();
  const featuredQuery = useFetchFeaturedQuery(featuredParkCode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let articlesList;
  let campgroundsList;

  const handleHeroSearchOnClick = () => {
    dispatch(
      setSelectedPark({
        featuredParkDetails: featuredQuery?.data,
        featuredPark: parksData?.data?.items.find((park: Park) => {
          return park.parkCode === featuredParkCode;
        }),
      })
    );
    navigate('/map');
  };

  const handleFeaturedParkCodeOnChange = (parkCode: string) => {
    setFeaturedParkCode(parkCode);
  };

  if (featuredQuery.isFetching) {
    articlesList = <SkeletonGrid />;
    campgroundsList = <SkeletonGrid />;
  } else if (featuredQuery.error) {
    articlesList = <div>Error...</div>;
    campgroundsList = <div>Error...</div>;
  } else {
    articlesList = <ArticlesList articles={featuredQuery.data?.articles} />;
    campgroundsList = (
      <CampgroundsList campgrounds={featuredQuery.data?.campgrounds} />
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8 mb-8">
          <div className="mx-auto max-w-5xl md:py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Discover Your Next Adventure
              </h1>
              <p className="mt-6 text-3xl font-medium leading-8 text-white relative z-10">
                Helping adventurers find their next great escape.
                <span className="absolute top-[-10px] bottom-[-10px] left-[-10px] right-[-10px] z-[-1] blur-lg bg-black opacity-50"></span>
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 pb-24">
                <HeroSearch
                  onChange={handleFeaturedParkCodeOnChange}
                  selectedParkCode={featuredParkCode}
                  onClick={handleHeroSearchOnClick}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 -z-10 overflow-hidden"
            aria-hidden="true"
          >
            <img
              src="/images/stream.jpg"
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="container mx-auto  p-8">
          <h2 className="text-2xl font-medium mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
            {articlesList}
          </div>

          <h2 className="text-2xl font-medium mb-8">Campsites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
            {campgroundsList}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
