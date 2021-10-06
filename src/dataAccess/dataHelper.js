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
  const updatedForms = [...currentLocalForms, form];
  localStorage.setItem("forms", JSON.stringify(updatedForms));
}

export { getFormsFromLocalStorage, addFormToLocalStorage };