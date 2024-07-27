import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  product: null,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, action) {
      state.visible = true;
      state.product = action.payload;
    },
    hidePopup(state) {
      state.visible = false;
      state.product = null;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
