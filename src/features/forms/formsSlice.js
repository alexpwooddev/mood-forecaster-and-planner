import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseISO, addDays, subDays } from "date-fns";

import {
  getFormsFromLocalStorage,
  addFormToLocalStorage,
} from "../../dataAccess/dataHelper";

const defaultFormValues = {
  date: new Date().toISOString(),
  mood: '10',
  energy: '10',
  morningText: "",
  afternoonText: "",
  eveningText: "",
  morningCheckbox: false,
  afternoonCheckbox: false,
  eveningCheckbox: false,
};

const initialState = {
  selectedDate: new Date().toISOString(),
  selectedForm: defaultFormValues,
  forms: [],
  status: "idle",
  error: null,
};

const setSelectedForm = (state, newDate, newDateISO) => {
  // setting selected Form for new date selection
  const {forms} = state;
  const formForSelectedDate = forms.find(
    (form) =>
      parseISO(form.date).toLocaleDateString() ===
      newDate.toLocaleDateString()
  );
  if (formForSelectedDate) {
    state.selectedForm = formForSelectedDate;
  } else {
    const newForm = { ...defaultFormValues };
    newForm.date = newDateISO;
    state.selectedForm = newForm;
  }
}

export const saveForm = createAsyncThunk("forms/saveForm", async (newForm) => {
  await addFormToLocalStorage(newForm);
  return newForm;
});

export const fetchFormsOnStart = createAsyncThunk(
  "forms/fetchFormsOnStart",
  async () => {
    const localForms = await getFormsFromLocalStorage();
    return localForms;
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

      setSelectedForm(state, newDate, newDateISO);
    },
    decrementDate: (state) => {
      const date = parseISO(state.selectedDate);
      const newDate = subDays(date, 1);
      const newDateISO = newDate.toISOString();
      state.selectedDate = newDateISO;

      setSelectedForm(state, newDate, newDateISO);
    },
    setDate: (state, action) => {
      const newDateISO = action.payload;
      const newDate = parseISO(newDateISO);
      state.selectedDate = newDateISO;

      setSelectedForm(state, newDate, newDateISO);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFormsOnStart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFormsOnStart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const localForms = action.payload;
        state.forms = localForms;

        const todayDate = new Date();
        const formForToday = localForms.find(
          (form) =>
            parseISO(form.date).toLocaleDateString() ===
            todayDate.toLocaleDateString()
        );

        state.selectedForm = formForToday || defaultFormValues;
      })
      .addCase(fetchFormsOnStart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(saveForm.fulfilled, (state, action) => {
      const newForm = action.payload;
      const stateForms = state.forms;

      const indexOfExistingFormForDate = stateForms
        .map((stateForm) => parseISO(stateForm.date).toLocaleDateString())
        .indexOf(parseISO(newForm.date).toLocaleDateString());

      if (indexOfExistingFormForDate >= 0) {
        // update form
        stateForms[indexOfExistingFormForDate] = newForm;
      } else {
        // create form
        stateForms.push(newForm);
      }
    });
  },
});

export const { incrementDate, decrementDate, setDate } = formsSlice.actions;

export default formsSlice.reducer;

export const selectFormByDate = (state, date) => {
  state.forms.forms.find((form) => parseISO(form.date) === parseISO(date));
};
