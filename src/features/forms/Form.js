import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveForm } from "./formsSlice";

import "./Form.css";

const autosavingState = {
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
};

export const Form = () => {
  const dispatch = useDispatch();
  const selectedForm = useSelector((state) => state.forms.selectedForm);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [form, setForm] = useState(selectedForm);
  const [autoSaving, setAutoSaving] = useState(autosavingState.NOT_SAVED);

  let timer;

  useEffect(() => {
    setForm(selectedForm);
  }, [selectedForm]);

  useEffect(() => {
    timer = null;
  })

  // const canSave =
  //   form["morningText"].length > 0 &&
  //   form["afternoonText"].length > 0 &&
  //   form["eveningText"].length > 0 &&
  //   addRequestStatus === "idle";

  const handleSave = async () => {
    try {
      setAddRequestStatus("pending");
      await dispatch(saveForm(form));
    } catch (err) {
      console.error("Failed to save the form: ", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const handleChange = async (e) => {
    
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? !form[name] : e.target.value;
    setForm({ ...form, [name]: value });
    setAutoSaving(autosavingState.NOT_SAVED);

    timer = setTimeout(async () => {
      setForm({ ...form, [name]: value });
      setAutoSaving(autosavingState.NOT_SAVED);

      await handleSave();
      setAutoSaving(autosavingState.SAVED);
    }, 1000)
  };

  return (
    <form className="form">
      <fieldset>
        <legend>Today I'm feeling...</legend>
        <div className="range-container">
          <label htmlFor="mood">MOOD:</label>
          <div className="range-input">
            <span>1</span>
            <input
              type="range"
              id="mood"
              name="mood"
              min="1"
              max="10"
              value={form.mood}
              onChange={handleChange}
            />
            <span>10</span>
          </div>
        </div>
        <div className="range-container">
          <label htmlFor="energy">ENERGY:</label>
          <div className="range-input">
            <span>1</span>
            <input
              type="range"
              id="energy"
              name="energy"
              min="1"
              max="10"
              value={form.energy}
              onChange={handleChange}
            />
            <span>10</span>
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
      <button type="button" onClick={handleSave}>
        Save Today's Info
      </button>
    </form>
  );
};
