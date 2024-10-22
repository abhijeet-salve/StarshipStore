import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity, price } = action.payload;

      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];

        if (quantity > 0) {
          // Update the existing item
          existingItem.quantity = quantity;
          existingItem.price = price;
        } else {
          // Remove the item if the quantity is zero
          state.items.splice(existingItemIndex, 1);
        }
      } else if (quantity > 0) {
        state.items.push({
          ...action.payload,
          quantity,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCartItem, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
