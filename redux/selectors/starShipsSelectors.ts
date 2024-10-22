import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectShipsState = (state: RootState) => state.starShips;

export const selectStarships = (state: RootState) => state.starShips.starShips;

export const selectShipById = createSelector(
  [selectStarships, (state: RootState, id: number) => id],
  (starShips, id) => {
    return starShips.find((ship) => ship.id === id) ?? ({} as Starship);
  }
);
