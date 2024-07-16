import React, { useEffect } from 'react';
import { render, act } from '@testing-library/react';
import usePosition from './usePosition';
import { SelectedPark } from '../types/apiTypes';
import { mockSelectedPark, mockSelectedParkUpdated } from './__mocks__/mockSelectedPark';

const TestComponent = ({ selectedPark, onPositionChange }: { selectedPark: SelectedPark | null, onPositionChange: (position: any) => void }) => {
  const [position] = usePosition(selectedPark);

  useEffect(() => {
    onPositionChange(position);
  }, [position, onPositionChange]);

  return null;
};

describe('usePosition', () => {
  test('should set initial position based on selectedPark', () => {
    const onPositionChange = jest.fn();

    act(() => {
      render(<TestComponent selectedPark={mockSelectedPark} onPositionChange={onPositionChange} />);
    });

    expect(onPositionChange).toHaveBeenCalledWith({
      lat: parseFloat(mockSelectedPark.featuredPark!.latitude),
      lng: parseFloat(mockSelectedPark.featuredPark!.longitude),
    });
  });

  test('should update position when selectedPark changes', () => {
    const onPositionChange = jest.fn();

    const { rerender } = render(
      <TestComponent selectedPark={mockSelectedPark} onPositionChange={onPositionChange} />
    );

    act(() => {
      rerender(<TestComponent selectedPark={mockSelectedParkUpdated} onPositionChange={onPositionChange} />);
    });

    expect(onPositionChange).toHaveBeenCalledWith({
      lat: parseFloat(mockSelectedParkUpdated.featuredPark!.latitude),
      lng: parseFloat(mockSelectedParkUpdated.featuredPark!.longitude),
    });
  });

  test('should set position to default if selectedPark is null', () => {
    const onPositionChange = jest.fn();

    act(() => {
      render(<TestComponent selectedPark={null} onPositionChange={onPositionChange} />);
    });

    expect(onPositionChange).toHaveBeenCalledWith({
      lat: 0,
      lng: 0,
    });
  });
});
