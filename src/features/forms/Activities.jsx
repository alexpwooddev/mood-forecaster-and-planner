import React from 'react';
import PropTypes from 'prop-types';

function Activities({ form, handleChange}) {
    return (
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
    )
}

Activities.propTypes = {
    form: PropTypes.shape({
      date: PropTypes.string,
      mood: PropTypes.string,
      energy: PropTypes.string,
      morningText: PropTypes.string,
      afternoonText: PropTypes.string,
      eveningText: PropTypes.string,
      morningCheckbox: PropTypes.bool,
      afternoonCheckbox: PropTypes.bool,
      eveningCheckbox: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
  };

export default Activities
