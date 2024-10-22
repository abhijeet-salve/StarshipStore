import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import starShipsApi from '../api/starShipsApi';

interface starShipsState {
  starShips: Starship[];
  nextUrl: string | null;
  loading: boolean;
  error: boolean;
}

const initialState: starShipsState = {
  starShips: [],
  nextUrl: null,
  loading: false,
  error: false,
};

const starShipsSlice = createSlice({
  name: 'starShips',
  initialState: initialState,
  reducers: {
    addStarship: (state, action: PayloadAction<Starship>) => {
      state.starShips.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(starShipsApi.endpoints.getStarShips.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        starShipsApi.endpoints.getStarShips.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.nextUrl = action.payload.next;

          action.payload.results.forEach((newStarship: Starship) => {
            const exists = state.starShips.some(
              (ship) => ship.name === newStarship.name
            );
            if (!exists) {
              state.starShips.push(newStarship);
            }
          });
        }
      )
      .addMatcher(
        starShipsApi.endpoints.getStarShips.matchRejected,
        (state) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const { addStarship } = starShipsSlice.actions;

export default starShipsSlice.reducer;
