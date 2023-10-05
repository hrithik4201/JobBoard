import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  coverLetter: '',
  resume: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: (state) => {
      return initialState;
    },
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;
export const selectFormData = (state) => state.form;

export default formSlice.reducer;
