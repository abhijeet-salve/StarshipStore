import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface starShipsState {
  starShips: Starship[];
  nextUrl: string | null;
}

const initialState: starShipsState = {
  starShips: [],
  nextUrl: null,
};

const starShipsStateSlice = createSlice({
  name: 'starShips',
  initialState,
  reducers: {
    addStarShips: (state, action: PayloadAction<Starship[]>) => {
      const existingUrls = new Set(state.starShips.map((ship) => ship.url));

      // safe check to avoid adding duplicate item, can be or not be depending on the business requirement.
      const newStarShips = action.payload.filter(
        (newShip) => !existingUrls.has(newShip.url)
      );

      state.starShips = [...state.starShips, ...newStarShips];
    },
    setNextUrl: (state, action: PayloadAction<string | null>) => {
      state.nextUrl = action.payload;
    },
    resetStarShips: (state) => {
      state.starShips = [];
      state.nextUrl = null;
    },
  },
});

export const { addStarShips, setNextUrl, resetStarShips } =
  starShipsStateSlice.actions;
export default starShipsStateSlice.reducer;
