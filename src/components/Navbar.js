import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseISO } from "date-fns";
import DayPicker from "react-day-picker";
import Event from "@material-ui/icons/EventAvailableOutlined";
import IconButton from "@material-ui/core/IconButton";

import "react-day-picker/lib/style.css";

import "./Navbar.css";
import {
  incrementDate,
  decrementDate,
  setDate,
} from "../features/forms/formsSlice";

export const Navbar = () => {
  const selectedDate = useSelector((state) =>
    parseISO(state.forms.selectedDate)
  );
  const localeDateString = selectedDate.toLocaleDateString();
  const options = { weekday: "long" };
  const selectedDay = new Intl.DateTimeFormat("en-US", options).format(
    selectedDate
  );

  const dispatch = useDispatch();

  const [pickedDate, setPickedDate] = useState("");
  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleDayClick = (day) => {
    setPickedDate(day);
    dispatch(setDate(day.toISOString()));
    setShowDayPicker(false);
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("left-chevron")) {
      dispatch(decrementDate());
    } else if (e.target.classList.contains("right-chevron")) {
      dispatch(incrementDate());
    } else {
      dispatch(setDate(new Date().toISOString()));
    }
  };

  const toggleShowDayPicker = () => {
    setShowDayPicker(!showDayPicker);
  };

  return (
    <React.Fragment>
      <div className="navbar">
      <div className="buttons-container">
        <IconButton className="left-chevron" onClick={handleClick}>
          <i className="chevron left-chevron">chevron_left</i>
        </IconButton>
        <IconButton className="todayButton" onClick={handleClick}>
          Today
        </IconButton>
        <IconButton className="calendar-button" onClick={toggleShowDayPicker}>
          <Event />
        </IconButton>
        {showDayPicker && (
          <DayPicker onDayClick={handleDayClick} selectedDays={pickedDate} />
        )}
        <IconButton className="right-chevron" onClick={handleClick}>
          <i className="chevron right-chevron">chevron_right</i>
        </IconButton>
      </div>
      <p>
        {selectedDay}, {localeDateString}
      </p>
    </div>
    <hr />
    </React.Fragment>
    
  );
};
