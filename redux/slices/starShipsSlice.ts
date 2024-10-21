import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface starShipsState {
  starShips: Starship[];
  nextUrl: string | null;
}

const initialState: starShipsState = {
  starShips: [],
  nextUrl: null,
};

const starShipsStateSlice = createSlice({
  name: "starShips",
  initialState,
  reducers: {
    addStarShips: (state, action: PayloadAction<Starship[]>) => {
      state.starShips = [...state.starShips, ...action.payload];
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
