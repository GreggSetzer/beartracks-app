import { SelectedPark } from '../../types/apiTypes';

export const mockSelectedPark: SelectedPark = {
  featuredParkDetails: {
    articles: [],
    campgrounds: [],
  },
  featuredPark: {
    latitude: '34.0522',
    longitude: '-118.2437',
    name: 'Great Smoky Mountains',
    email: 'grsm@example.gov',
    description: 'Test Description',
    designation: 'national park',
    fullName: 'Great Smoky Mountains National Park',
    id: 'ABC-123',
    parkCode: 'grsm',
    directionsInfo: '',
    directionsUrl: '',
    ext: '',
    url: '',
    phoneNumber: '',
    weatherInfo: '',
  },
};

export const mockSelectedParkUpdated: SelectedPark = {
  featuredPark: {
    ...mockSelectedPark.featuredPark!,
    latitude: '40.7128',
    longitude: '-74.0060',
  },
  featuredParkDetails: {
    ...mockSelectedPark.featuredParkDetails!
  }
};