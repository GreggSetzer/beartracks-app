import { useEffect, useState } from 'react';
import { Position, SelectedPark } from '../types/apiTypes';

const usePosition = (selectedPark: SelectedPark | null) => {
  const [position, setPosition] = useState<Position>({
    lat: parseFloat(selectedPark?.featuredPark?.latitude || '0'),
    lng: parseFloat(selectedPark?.featuredPark?.longitude || '0'),
  });

  useEffect(() => {
    if (selectedPark) {
      setPosition({
        lat: parseFloat(selectedPark.featuredPark?.latitude || '0'),
        lng: parseFloat(selectedPark.featuredPark?.longitude || '0'),
      });
    }
  }, [selectedPark]);

  return [position, setPosition] as const;
};

export default usePosition;
