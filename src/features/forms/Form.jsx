import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AutoSaveDisplay from '../../components/AutosaveDisplay';
import useModal from '../../customHooks/useModal';
import useAutosave from "../../customHooks/useAutosave";
import Forecast from './Forecast';
import Activities from './Activities';
import Modal from '../../components/Modal';
import './Form.css';

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

const Form = () => {
  const selectedForm = useSelector((state) => state.forms.selectedForm);
  const [
    modalState,
    modalTitle,
    modalMessage,
    { show, hide, changeModalMessage, changeModalTitle },
  ] = useModal();
  const [form, setForm] = useState(selectedForm);
  const [autoSaveState, setAutoSaveState] = useState(SavingState.NOT_SAVED);
  const modifyAutoSaveState = (newState) => {
    setAutoSaveState(newState);
  };
  useAutosave(form, modifyAutoSaveState);

  useEffect(() => {
    setForm(selectedForm);
  }, [selectedForm]);

  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === "checkbox" ? !form[name] : e.target.value;

    if (e.target.type === "range" && e.target.value <= 5) {
      if (e.target.id === "mood") {
        changeModalTitle(`It's looking foggy`);
        changeModalMessage(`Is there anything nice you can do for yourself today?`);
        show();
      } else {
        changeModalTitle(`It's looking foggy`);
        changeModalMessage(`Are there any activities you can delegate or get help with?`);
        show();
      }
    }

    modifyAutoSaveState(SavingState.NOT_SAVED);
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <form className="form">
        <Forecast form={form} handleChange={handleChange} />
        <Activities form={form} handleChange={handleChange} />
        <AutoSaveDisplay saving={autoSaveState} />
      </form>
      {modalState === 'show' ? <Modal hide={hide} title={modalTitle} message={modalMessage} /> : null}
    </>
  );
};

export default Form;
