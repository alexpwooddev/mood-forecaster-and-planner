import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addFormToLocalStorage } from  '../../dataAccess/dataHelper';

const initialState = {
  forms: [],
  status: "idle",
  error: null,
};

export const addNewForm = createAsyncThunk(
  'forms/addNewForm',
  async (initialForm) => {
    await addFormToLocalStorage(initialForm);
    return initialForm;
  }
)

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(addNewForm.fulfilled, (state, action) => {
      state.forms.push(action.payload);
    })
  }
});

export const { formAdded } = formsSlice.actions

export default formsSlice.reducer;