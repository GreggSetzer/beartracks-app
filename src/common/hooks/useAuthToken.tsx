import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const useAuthToken = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getAccessTokenSilently();
        setToken(fetchedToken);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchToken();
    }
  }, [getAccessTokenSilently, user]);

  return { token, user };
};

export default useAuthToken;
