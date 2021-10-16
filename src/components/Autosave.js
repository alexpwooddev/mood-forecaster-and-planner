import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";

import { saveForm } from "../features/forms/formsSlice";
import { debounce } from '../utils/debounce'

export const Autosave = ({ form }) => {
  const dispatch = useDispatch();

  const save = async (form) => {
    try {
      await dispatch(saveForm(form));
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

  useEffect(() => {
  });

  return null;
};
