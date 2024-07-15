import { createSlice } from '@reduxjs/toolkit';
import { SelectedPark } from '../common/types/apiTypes';
import { RootState } from './store';

const initialState: SelectedPark = {
  featuredPark: null,
  featuredParkDetails: null,
};

const featuredParkSlice = createSlice({
  name: 'selectedPark',
  initialState,
  reducers: {
    setSelectedPark: (state, action) => {
      state.featuredPark = action.payload.featuredPark;
      state.featuredParkDetails = action.payload.featuredParkDetails;
    },
  },
});

export const { setSelectedPark } = featuredParkSlice.actions;
export const selectParkCode = (state: RootState) => state.selectedPark.featuredPark?.parkCode;
export default featuredParkSlice.reducer;
