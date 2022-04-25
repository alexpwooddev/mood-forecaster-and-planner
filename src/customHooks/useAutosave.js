/* eslint-disable no-shadow */
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";

import { saveForm } from "../features/forms/formsSlice";
import debounce from "../utils/debounce";

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

const useAutosave = (form, modifyAutoSaveState) => {
  const dispatch = useDispatch();

  const save = async (form) => {
    try {
      modifyAutoSaveState(SavingState.SAVING);
      await dispatch(saveForm(form));
      modifyAutoSaveState(SavingState.SAVED);
    } catch (err) {
      // eslint-disable-next-line
      console.error("Failed to save the form: ", err);
    }
  };

  const debouncedSave = useCallback(
    debounce(async (form) => {
      await save(form);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSave(form);
  }, [form, debouncedSave]);

  return null;
};

export default useAutosave;
