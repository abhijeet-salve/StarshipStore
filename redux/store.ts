import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import starShipsApi from './api/starShipsApi';
import starShipsReducer from './slices/starShipsSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    starShips: starShipsReducer,
    [starShipsApi.reducerPath]: starShipsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starShipsApi.middleware, logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
