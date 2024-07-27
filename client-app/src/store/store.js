import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';
import cartReducer from './cartSlice';


const store = configureStore({
  reducer: {
    popup: popupReducer,
    cart: cartReducer,
  },
});

export default store;
