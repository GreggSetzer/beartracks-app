import { useEffect } from 'react';
import { render, act } from '@testing-library/react';
import { useFetchFavoritesQuery } from '../../app/FavoritesApi';
import useFavorites from './useFavorites';

jest.mock('../../app/FavoritesApi');

const TestComponent = ({ user, token, onFetch }: { user: any, token: string, onFetch: (favorites: any, error: any, isLoading: boolean) => void }) => {
  const { favorites, favoritesError, isFavoritesLoading } = useFavorites(user, token);

  useEffect(() => {
    onFetch(favorites, favoritesError, isFavoritesLoading);
  }, [favorites, favoritesError, isFavoritesLoading, onFetch]);

  return null;
};

describe('useFavorites', () => {
  const mockUseFetchFavoritesQuery = useFetchFavoritesQuery as jest.Mock;
  let user: { sub: string };
  let token: string;

  beforeEach(() => {
    jest.clearAllMocks();
    user = { sub: 'test-user' };
    token = 'test-token';
  });

  test('should fetch and set favorites when user and token are present', async () => {
    const mockFavorites = ['favorite1', 'favorite2'];
    mockUseFetchFavoritesQuery.mockReturnValue({ data: mockFavorites, error: null, isLoading: false });
    const onFetch = jest.fn();

    await act(async () => {
      render(<TestComponent user={user} token={token} onFetch={onFetch} />);
    });

    expect(mockUseFetchFavoritesQuery).toHaveBeenCalledWith(
      { userId: user.sub, token },
      { skip: false }
    );
    expect(onFetch).toHaveBeenCalledWith(mockFavorites, null, false);
  });

  test('should handle error when fetching favorites fails', async () => {
    const errorMessage = 'Failed to fetch favorites';
    mockUseFetchFavoritesQuery.mockReturnValue({ data: null, error: new Error(errorMessage), isLoading: false });
    const onFetch = jest.fn();

    await act(async () => {
      render(<TestComponent user={user} token={token} onFetch={onFetch} />);
    });

    expect(mockUseFetchFavoritesQuery).toHaveBeenCalledWith(
      { userId: user.sub, token },
      { skip: false }
    );
    expect(onFetch).toHaveBeenCalledWith(null, new Error(errorMessage), false);
  });

  test('should not fetch favorites when user or token is not present', async () => {
    const onFetch = jest.fn();
    mockUseFetchFavoritesQuery.mockReturnValue({ data: null, error: null, isLoading: false });

    await act(async () => {
      render(<TestComponent user={null} token="" onFetch={onFetch} />);
    });

    expect(mockUseFetchFavoritesQuery).toHaveBeenCalledWith(
      { userId: '', token: '' },
      { skip: true }
    );
    expect(onFetch).toHaveBeenCalledWith(null, null, false);
  });
});
