import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewForm } from "./formsSlice";

import "./Form.css";

const defaultFormValues = {
  date: new Date().toISOString(),
  mood: 10,
  energy: 10,
  morningText: "",
  afternoonText: "",
  eveningText: "",
  morningCheckbox: false,
  afternoonCheckbox: false,
  eveningCheckbox: false,
};

export const Form = (props) => {
  const dispatch = useDispatch();
  const selectedForm = useSelector((state) => state.forms.selectedForm);
  const selectedFormIsEmpty = selectedForm && Object.keys(selectedForm).length === 0 && selectedForm.constructor === Object;

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [form, setForm] = useState(selectedFormIsEmpty === true ? defaultFormValues: selectedForm);

  useEffect(() => {
      console.log(form)
  }, [form])

  const canSave =
    form["morningText"].length > 0 &&
    form["afternoonText"].length > 0 &&
    form["eveningText"].length > 0 &&
    addRequestStatus === "idle";

  const handleSave = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewForm(form));
      } catch (err) {
        console.error("Failed to save the form: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? !form[name] : e.target.value;
    setForm({ ...form, [name]: value });
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
                <input
                  type="textarea"
                  id="morningText"
                  name="morningText"
                  rows="5"
                  cols="33"
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="checkbox"
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
                <input
                  type="textarea"
                  id="afternoonText"
                  name="afternoonText"
                  rows="5"
                  cols="33"
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="checkbox"
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
                <input
                  type="textarea"
                  id="eveningText"
                  name="eveningText"
                  rows="5"
                  cols="33"
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="checkbox"
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
      <button type="button" onClick={handleSave} disabled={!canSave}>
        Save Today's Info
      </button>
    </form>
  );
};
