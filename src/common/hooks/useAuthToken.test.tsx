import React, { useEffect } from 'react';
import { render, act } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthToken from './useAuthToken';

jest.mock('@auth0/auth0-react');

const TestComponent = ({ onTokenFetched }: { onTokenFetched: (token: string, user: any) => void }) => {
  const { token, user } = useAuthToken();

  useEffect(() => {
    onTokenFetched(token, user);
  }, [token, user, onTokenFetched]);

  return null;
};

describe('useAuthToken', () => {
  const mockGetAccessTokenSilently = jest.fn();
  const mockUser = { name: 'test user' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth0 as jest.Mock).mockReturnValue({
      getAccessTokenSilently: mockGetAccessTokenSilently,
      user: mockUser,
    });
  });

  test('should fetch and set token when user is present', async () => {
    const tokenValue = 'fake-token';
    mockGetAccessTokenSilently.mockResolvedValue(tokenValue);
    const onTokenFetched = jest.fn();

    await act(async () => {
      render(<TestComponent onTokenFetched={onTokenFetched} />);
    });

    expect(mockGetAccessTokenSilently).toHaveBeenCalledTimes(1);
    expect(onTokenFetched).toHaveBeenCalledWith(tokenValue, mockUser);
  });

  test('should handle error when fetching token fails', async () => {
    const errorMessage = 'Failed to fetch token';
    const consoleErrorSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const onTokenFetched = jest.fn();
    mockGetAccessTokenSilently.mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      render(<TestComponent onTokenFetched={onTokenFetched} />);
    });

    expect(mockGetAccessTokenSilently).toHaveBeenCalledTimes(1);
    expect(onTokenFetched).toHaveBeenCalledWith('', mockUser);
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));

    consoleErrorSpy.mockRestore();
  });

  test('should not fetch token when user is not present', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      getAccessTokenSilently: mockGetAccessTokenSilently,
      user: null,
    });
    const onTokenFetched = jest.fn();

    await act(async () => {
      render(<TestComponent onTokenFetched={onTokenFetched} />);
    });

    expect(mockGetAccessTokenSilently).not.toHaveBeenCalled();
    expect(onTokenFetched).toHaveBeenCalledWith('', null);
  });
});
