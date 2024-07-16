import { Auth0Provider } from '@auth0/auth0-react';
import { SkeletonGrid } from '@greggsetzer/beartracks-ui';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@greggsetzer/beartracks-ui/dist/index.css';
import 'react-responsive-modal/styles.css';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { ViewportProvider } from './common/contexts/ViewportProvider';
import FavoritesPage from './features/favorites/FavoritesPage';
import reportWebVitals from './reportWebVitals';

const HomePage = lazy(() => import('./features/home/HomePage'));
const MapPage = lazy(() => import('./features/map/MapPage'));
const NotFound = lazy(() => import('./common/components/NotFound'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const audience = process.env.REACT_APP_AUTH0_AUDIENCE!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const domain = process.env.REACT_APP_AUTH0_DOMAIN!;

root.render(
  <Auth0Provider
    domain={domain} // The SPA application
    clientId={clientId} // This is the SPA application
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience,
    }}
  >
    <ReduxProvider store={store}>
      <ViewportProvider>
        <BrowserRouter>
          <Suspense fallback={<SkeletonGrid />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ViewportProvider>
    </ReduxProvider>
  </Auth0Provider>
);

reportWebVitals();
