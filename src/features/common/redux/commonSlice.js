import { createSlice } from '@reduxjs/toolkit';
import { TOAST_TYPE } from '../constant';
import uniqId from 'uniqid';

const initToast = {
  id: null,
  title: null,
  message: null,
  type: TOAST_TYPE.DEFAULT,
  options: {},
};

const initialState = {
  toast: initToast,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setToast(state, action) {
      state.toast = {
        id: uniqId(),
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
        options: action.payload.options,
      };
    },
    resetToast(state) {
      state.toast = initToast;
    },
    showSuccessToast(state, action) {
      state.toast = {
        id: uniqId(),
        ...action.payload,
        type: TOAST_TYPE.SUCCESS,
      };
    },
    showErrorToast(state, action) {
      state.toast = {
        id: uniqId(),
        ...action.payload,
        type: TOAST_TYPE.ERROR,
      };
    },
  },
  extraReducers: {},
});

// Actions
export const {
  setToast,
  resetToast,
  showSuccessToast,
  showErrorToast,
} = commonSlice.actions;

// Reducer
export default commonSlice.reducer;
