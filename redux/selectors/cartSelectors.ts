import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const getQuantityByName = createSelector(
  [selectCartItems, (state: RootState, name: string) => name],
  (items, name) => {
    return items.find((ship) => ship.name === name)?.quantity || 0;
  }
);

export const selectTotalQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
