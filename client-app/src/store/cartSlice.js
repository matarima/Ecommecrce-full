import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";

const initialState = {
  listCart: [],
  loading: false,
  error: null,
  total: 0,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, item }, { rejectWithValue, getState }) => {
    try {
      const currentCart = getState().cart.listCart;
      const existingItem = currentCart.find(
        (cartItem) => cartItem._id === item._id
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = currentCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedItems = [...currentCart, item];
      }

      const response = await axiosInstance.post(`/cart/${userId}`, {
        items: updatedItems,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const cart = getState().cart.listCart;
      const updatedItems = cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      const response = await axiosInstance.post(`/cart/${userId}`, {
        items: updatedItems,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const cart = getState().cart.listCart;
      const updatedItems = cart.filter((item) => item._id !== productId);
      await axiosInstance.post(`/cart/${userId}`, { items: updatedItems });
      dispatch(fetchCart(userId));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/clear/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    localClearCart: (state) => {
      state.listCart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.listCart = action.payload;
        state.total = state.listCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.listCart = action.payload;
        state.total = state.listCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.listCart = action.payload;
        state.total = state.listCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.total = state.listCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.listCart = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { localClearCart } = cartSlice.actions;
export default cartSlice.reducer;
