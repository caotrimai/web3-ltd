import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallets: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallets (state, action) {
      const currentWallets = state.wallets.map(({ address }) => address);
      const newWallets = action.payload
      .filter(({ address }) => !currentWallets.includes(address));
      state.wallets = [...state.wallets, ...newWallets];
    },
  },
});

// Actions
export const {
  addWallets,
} = walletSlice.actions;

// Reducer
export default walletSlice.reducer;
