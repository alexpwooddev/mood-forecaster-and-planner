import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cloud from "@material-ui/icons/Cloud";
import WbSunny from "@material-ui/icons/WbSunny";

import Autosave from "../../components/Autosave";
import AutoSaveDisplay from "../../components/AutosaveDisplay";
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
        <fieldset>
          <legend>
            <h2>Wellbeing Forecast:</h2>
          </legend>
          <div className="forecast-fieldset-grid">
            <Cloud className="cloud-icon" />
            <WbSunny className="sun-icon" />
            <label htmlFor="mood">MOOD:</label>
            <span className="range-number-label">1</span>
            <input
              type="range"
              id="mood"
              name="mood"
              aria-label="mood"
              min="1"
              max="10"
              value={form.mood}
              onChange={handleChange}
            />
            <span className="range-number-label">10</span>
            <label htmlFor="energy">ENERGY:</label>
            <span className="range-number-label">1</span>
            <input
              type="range"
              id="energy"
              name="energy"
              aria-label="energy"
              min="1"
              max="10"
              value={form.energy}
              onChange={handleChange}
            />
            <span className="range-number-label">10</span>
          </div>
        </fieldset>
        <fieldset>
          <div className="activities-grid">
            <h3 className="activities-title activities-willDo-title">
              Activities I will do today:
            </h3>
            <h3 className="activities-title activities-completed-title">
              At least one completed:
            </h3>
            <h3 className="time-label">Morning</h3>
            <textarea
              id="morningText"
              name="morningText"
              aria-label="morningText"
              rows="5"
              cols="33"
              value={form.morningText}
              onChange={handleChange}
            />
            <input
              type="checkbox"
              className="regular-checkbox"
              id="morningCheckbox"
              name="morningCheckbox"
              aria-label="morningCheckbox"
              checked={form.morningCheckbox}
              onChange={handleChange}
            />
            <h3 className="time-label">Afternoon</h3>
            <textarea
              id="afternoonText"
              name="afternoonText"
              aria-label="afternoonText"
              rows="5"
              cols="33"
              value={form.afternoonText}
              onChange={handleChange}
            />
            <input
              type="checkbox"
              className="regular-checkbox"
              id="afternoonCheckbox"
              name="afternoonCheckbox"
              aria-label="afternoonCheckbox"
              checked={form.afternoonCheckbox}
              onChange={handleChange}
            />
            <h3 className="time-label">Evening</h3>
            <textarea
              id="eveningText"
              name="eveningText"
              aria-label="eveningText"
              rows="5"
              cols="33"
              value={form.eveningText}
              onChange={handleChange}
            />
            <input
              type="checkbox"
              className="regular-checkbox"
              id="eveningCheckbox"
              name="eveningCheckbox"
              aria-label="eveningCheckbox"
              checked={form.eveningCheckbox}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <AutoSaveDisplay saving={autoSaveState} />
      </form>
    </>
  );
};

export default Form;
