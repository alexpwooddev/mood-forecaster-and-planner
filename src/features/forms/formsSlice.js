import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
  status: "idle",
  error: null,
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    formAdded(state, action) {
        state.forms.push(action.payload);
    },
  },
});

export const { formAdded } = formsSlice.actions

export default formsSlice.reducer;