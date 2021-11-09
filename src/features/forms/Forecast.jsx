import React from 'react';
import PropTypes from 'prop-types';
import Cloud from '@material-ui/icons/Cloud';
import WbSunny from '@material-ui/icons/WbSunny';

function Forecast({ form, handleChange }) {
  return (
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
  );
}

Forecast.propTypes = {
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

export default Forecast;
