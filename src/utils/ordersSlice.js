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
      state.orders.splice(action.payload, 1);
    },
    clearOrders: state => {
      state.orders = [];
    },
  },
});

export const {addOrder, removeOrder, clearOrders} = ordersSlice.actions;

export default ordersSlice.reducer;
