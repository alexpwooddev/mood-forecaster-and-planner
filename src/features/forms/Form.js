import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cloud from "@material-ui/icons/Cloud";
import WbSunny from "@material-ui/icons/WbSunny";

import { Autosave } from "../../components/Autosave";
import { AutoSaveDisplay } from "../../components/AutosaveDisplay";
import "./Form.css";

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

export const Form = () => {
  const selectedForm = useSelector((state) => state.forms.selectedForm);
  const [form, setForm] = useState(selectedForm);
  const [autoSaveState, setAutoSaveState] = useState(SavingState.NOT_SAVED);

  useEffect(() => {
    setForm(selectedForm);
  }, [selectedForm]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? !form[name] : e.target.value;
    modifyAutoSaveState(SavingState.NOT_SAVED);
    setForm({ ...form, [name]: value });
  };

  const modifyAutoSaveState = (newState) => {
    setAutoSaveState(newState);
  };

  return (
    <React.Fragment>
      <Autosave form={form} modifyAutoSaveState={modifyAutoSaveState} />
      <form className="form">
        <fieldset>
          <legend><span className="bold-span">Wellbeing Forecast:</span></legend>
          <div className="range-container">
            <div className="label-wrapper">
              <label htmlFor="mood">MOOD:</label>
            </div>
            <div className="range-input">
              <div className="weather-icons-wrapper">
                <Cloud />
                <WbSunny />
              </div>
              <span className="range-number-label">1</span>
              <input
                type="range"
                id="mood"
                name="mood"
                min="1"
                max="10"
                value={form.mood}
                onChange={handleChange}
              />
              <span className="range-number-label">10</span>
            </div>
          </div>
          <div className="range-container">
            <div className="label-wrapper">
              <label htmlFor="energy">ENERGY:</label>
            </div>
            <div className="range-input">
              <span className="range-number-label">1</span>
              <input
                type="range"
                id="energy"
                name="energy"
                min="1"
                max="10"
                value={form.energy}
                onChange={handleChange}
              />
              <span className="range-number-label">10</span>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <table>
            <thead>
              <tr>
                <th colSpan="2">Activities I will do today:</th>
                <th>At least one completed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Morning</td>
                <td>
                  <textarea
                    id="morningText"
                    name="morningText"
                    rows="5"
                    cols="33"
                    value={form.morningText}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="regular-checkbox"
                    id="morningCheckbox"
                    name="morningCheckbox"
                    checked={form.morningCheckbox}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Afternoon</td>
                <td>
                  <textarea
                    id="afternoonText"
                    name="afternoonText"
                    rows="5"
                    cols="33"
                    value={form.afternoonText}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="regular-checkbox"
                    id="afternoonCheckbox"
                    name="afternoonCheckbox"
                    checked={form.afternoonCheckbox}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Evening</td>
                <td>
                  <textarea
                    id="eveningText"
                    name="eveningText"
                    rows="5"
                    cols="33"
                    value={form.eveningText}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="regular-checkbox"
                    id="eveningCheckbox"
                    name="eveningCheckbox"
                    checked={form.eveningCheckbox}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <AutoSaveDisplay saving={autoSaveState} />
      </form>
    </React.Fragment>
  );
};
