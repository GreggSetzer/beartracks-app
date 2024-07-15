import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SkeletonGrid } from '@greggsetzer/navigator-demo-ui';
import React from 'react';
import Layout from '../../common/components/Layout';
import FavoritesList from './components/FavoritesList';

const FavoritesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-medium mb-3">Favorites</h1>
        <FavoritesList />
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(FavoritesPage, {
  onRedirecting: () => <SkeletonGrid />,
  returnTo: '/',
});
