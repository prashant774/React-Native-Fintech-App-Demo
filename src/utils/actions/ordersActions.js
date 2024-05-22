import {createSlice} from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        order => order.symbol !== action.payload,
      );
    },
  },
});

export const {addOrder, removeOrder} = ordersSlice.actions;
export default ordersSlice.reducer;
