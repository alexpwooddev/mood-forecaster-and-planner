import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseISO, addDays, subDays } from "date-fns";

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

export const saveForm = createAsyncThunk(
  "forms/saveForm",
  async (newForm) => {
    await addFormToLocalStorage(newForm);
    return newForm;
  }
);

export const getStoredFormForInitialRender = createAsyncThunk(
  "forms/getStoredFormForInitialRender",
  async (_, { getState }) => {
    let localForms = await getFormsFromLocalStorage();
    let selectedDate = getState().forms.selectedDate;
    let selectedDateParsed = parseISO(selectedDate);
    let formForSelectedDate = localForms.find(
      (form) =>
        parseISO(form.date).toLocaleDateString() ===
        selectedDateParsed.toLocaleDateString()
    );
    return formForSelectedDate;
  }
);

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    incrementDate: (state) => {
      const date = parseISO(state.selectedDate);
      const newDate = addDays(date, 1);
      const newDateISO = newDate.toISOString();
      state.selectedDate = newDateISO;

      //setting selected Form for new date selection
      const forms = state.forms;
      let formForSelectedDate = forms.find(
        (form) =>
          parseISO(form.date).toLocaleDateString() ===
          newDate.toLocaleDateString()
      );
      if (formForSelectedDate >= 0) {
        state.selectedForm = formForSelectedDate;
      } else {
        state.selectedForm = null;
      }
    },
    decrementDate: (state) => {
      const date = parseISO(state.selectedDate);
      const newDate = subDays(date, 1).toISOString();
      state.selectedDate = newDate;
    },
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStoredFormForInitialRender.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getStoredFormForInitialRender.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newForm = action.payload;
        state.selectedForm = newForm;

        //only add to state if unique
        //NEED TO REVIEW WHAT I'M DOING HERE AND WHY
        let stateForms = state.forms;
        console.log(stateForms.length);
        if (stateForms.length === 0) {
          state.forms.push(newForm);
        } else {
          let indexOfExistingFormForDate = stateForms
            .map((stateForm) => parseISO(stateForm.date).toLocaleDateString())
            .indexOf(parseISO(newForm.date).toLocaleDateString());

          if (indexOfExistingFormForDate >= 0) {
            stateForms[indexOfExistingFormForDate] = newForm;
          } else {
            stateForms.push(newForm);
          }
        }
      })
      .addCase(getStoredFormForInitialRender.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(saveForm.fulfilled, (state, action) => {
      const newForm = action.payload;
      //NEED TO REVIEW WHAT I'M DOING HERE AND WHY
      //only add to state if unique
      let stateForms = state.forms;
      console.log(stateForms.length);
      if (stateForms.length === 0) {
        state.forms.push(newForm);
      } else {
        let indexOfExistingFormForDate = stateForms
          .map((stateForm) => parseISO(stateForm.date).toLocaleDateString())
          .indexOf(parseISO(newForm.date).toLocaleDateString());

        if (indexOfExistingFormForDate >= 0) {
          stateForms[indexOfExistingFormForDate] = newForm;
        } else {
          stateForms.push(newForm);
        }
      }
    });
  },
});

export const { incrementDate, decrementDate, setDate } = formsSlice.actions;

export default formsSlice.reducer;

export const selectFormByDate = (state, date) => {
  state.forms.forms.find((form) => parseISO(form.date) === parseISO(date));
};
