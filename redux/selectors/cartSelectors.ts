import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const getQuantityById = createSelector(
  [selectCartItems, (state: RootState, id: number) => id],
  (items, id) => {
    return items.find((ship) => ship.id === id)?.quantity || 0;
  }
);

export const selectTotalQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
