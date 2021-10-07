import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseISO } from "date-fns";

import {
  getFormsFromLocalStorage,
  addFormToLocalStorage,
} from "../../dataAccess/dataHelper";

const initialState = {
  selectedDate: new Date().toISOString(),
  selectedForm: null,
  forms: [],
  status: "idle",
  error: null,
};

export const addNewForm = createAsyncThunk(
  "forms/addNewForm",
  async (initialForm) => {
    await addFormToLocalStorage(initialForm);
    return initialForm;
  }
);

export const getFormForSelectedDate = createAsyncThunk(
  "forms/getFormForSelectedDate",
  async (_, { getState }) => {
    let localForms = await getFormsFromLocalStorage();
    let selectedDate = getState().forms.selectedDate;
    let selectedDateParsed = parseISO(selectedDate);
    let formsForSelectedDate = localForms.filter(
      (form) =>
        parseISO(form.date).toLocaleDateString() ===
        selectedDateParsed.toLocaleDateString()
    );
    let newestFormForSelectedDate =
      formsForSelectedDate[formsForSelectedDate.length - 1];
    return newestFormForSelectedDate;
  }
);

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    incrementDate: (state) => {
      let date = state.selectedDate;
      let newDate = date.setDate(date.getDate() + 1);
      state.selectedDate = newDate;
    },
    decrementDate: (state) => {
      let date = state.selectedDate;
      let newDate = date.setDate(date.getDate() - 1);
      state.selectedDate = newDate;
    },
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFormForSelectedDate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFormForSelectedDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedForm = action.payload;
      })
      .addCase(getFormForSelectedDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(addNewForm.fulfilled, (state, action) => {
      state.forms.push(action.payload);
    });
  },
});

export const { incrementDate, decrementDate, setDate } = formsSlice.actions;

export default formsSlice.reducer;

export const selectFormByDate = (state, date) => {
  state.forms.forms.find((form) => parseISO(form.date) === parseISO(date));
};
