/* eslint-disable no-shadow */ 
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { saveForm } from "../features/forms/formsSlice";
import debounce from "../utils/debounce";

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

const Autosave = ({ form, modifyAutoSaveState }) => {
  const dispatch = useDispatch();

  const save = async (form) => {
    try {
      modifyAutoSaveState(SavingState.SAVING);
      await dispatch(saveForm(form));
      modifyAutoSaveState(SavingState.SAVED);
    } catch (err) {
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

Autosave.propTypes = {
  form: PropTypes.shape({
    date: PropTypes.string,
    mood: PropTypes.string,
    energy: PropTypes.string,
    morningText: PropTypes.string,
    afternoonText: PropTypes.string,
    eveningText: PropTypes.string,
    morningCheckbox: PropTypes.boolean,
    afternoonCheckbox: PropTypes.boolean,
    eveningCheckbox: PropTypes.boolean,
  }),
  modifyAutoSaveState: PropTypes.func.isRequired,
};

export default Autosave;
