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
  const currentLocalForms = getFormsFromLocalStorage();

  const formExistsForDate = currentLocalForms.filter((localForm) =>
    localForm.find(
      parseISO(localForm.date).toLocaleDateString() ===
        parseISO(form.date).toLocaleDateString()
    )
  );
  //if we've found a form for the date, need to then edit that form 
  //then replace the original with the edited one in the currentLocalForms array

  const updatedForms = [...currentLocalForms, form];
  localStorage.setItem("forms", JSON.stringify(updatedForms));
}

export { getFormsFromLocalStorage, addFormToLocalStorage };
