import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Autosave from "../../components/Autosave";
import AutoSaveDisplay from "../../components/AutosaveDisplay";
import Forecast from './Forecast';
import Activities from "./Activities";
import "./Form.css";

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

const Form = () => {
  const selectedForm = useSelector((state) => state.forms.selectedForm);
  const [form, setForm] = useState(selectedForm);
  const [autoSaveState, setAutoSaveState] = useState(SavingState.NOT_SAVED);

  useEffect(() => {
    setForm(selectedForm);
  }, [selectedForm]);

  const modifyAutoSaveState = (newState) => {
    setAutoSaveState(newState);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === "checkbox" ? !form[name] : e.target.value;
    modifyAutoSaveState(SavingState.NOT_SAVED);
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <Autosave form={form} modifyAutoSaveState={modifyAutoSaveState} />
      <form className="form">
        <Forecast form={form} handleChange={handleChange} />
        <Activities form={form} handleChange={handleChange} />
        <AutoSaveDisplay saving={autoSaveState} />
      </form>
    </>
  );
};

export default Form;
