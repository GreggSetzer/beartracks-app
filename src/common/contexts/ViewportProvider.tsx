import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { throttle } from '../utils';

interface ViewportProviderProps {
  children: ReactNode;
}

// Define the context
const ViewportContext = createContext<{ isMobile: boolean }>({
  isMobile: false,
});

// Create a provider component
const ViewportProvider = ({ children }: ViewportProviderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth < 1024);
    }, 300);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile }}>
      {children}
    </ViewportContext.Provider>
  );
};

// Custom hook to use the ViewportContext
const useViewport = () => useContext(ViewportContext);

export { ViewportProvider, useViewport };
