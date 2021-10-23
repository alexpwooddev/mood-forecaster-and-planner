/* eslint-disable */
import { parseISO } from "date-fns";

function getFormsFromLocalStorage() {
  let localForms = JSON.parse(localStorage.getItem("forms"));
  if (localForms != null) {
    return localForms;
  } else {
    return [];
  }
}

function addFormToLocalStorage(form) {
  let currentLocalForms = getFormsFromLocalStorage();
  let indexOfExistingFormForDate = currentLocalForms
    .map((localForm) => parseISO(localForm.date).toLocaleDateString())
    .indexOf(parseISO(form.date).toLocaleDateString());

  if (indexOfExistingFormForDate >= 0) {
    currentLocalForms[indexOfExistingFormForDate] = form;
  } else {
    currentLocalForms = [...currentLocalForms, form];
  }

  localStorage.setItem("forms", JSON.stringify(currentLocalForms));
}

export { getFormsFromLocalStorage, addFormToLocalStorage };
