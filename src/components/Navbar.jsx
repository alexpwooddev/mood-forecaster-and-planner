import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import DayPicker from 'react-day-picker';
import Event from '@material-ui/icons/EventAvailableOutlined';
import styled from 'styled-components/macro';
import IconButton from './IconButton';
import ChevronRight from './ChevronRight';
import ChevronLeft from './ChevronLeft';
import 'react-day-picker/lib/style.css';

import './Daypicker.css';
import {
  incrementDate,
  decrementDate,
  setDate,
} from '../features/forms/formsSlice';

const Navbar = () => {
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
    <>
      <NavbarContainer>
        <ButtonsContainer>
          <ChevronLeft
            className="left-chevron"
            onClick={handleClick}
            aria-label="left-chevron"
          />
          <IconButton
            className="todayButton"
            onClick={handleClick}
            aria-label="today-button"
          >
            Today
          </IconButton>
          <IconButton
            className="calendar-button"
            onClick={toggleShowDayPicker}
            aria-label="calendar-button"
          >
            <Event />
          </IconButton>
          {showDayPicker && (
            <DayPicker onDayClick={handleDayClick} selectedDays={pickedDate} />
          )}
          <ChevronRight
            className="right-chevron"
            onClick={handleClick}
            aria-label="right-chevron"
          />
        </ButtonsContainer>
        <StyledP>
          {selectedDay}, {localeDateString}
        </StyledP>
      </NavbarContainer>
      <Hr />
    </>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px;
`;

const ButtonsContainer = styled.div`
  padding-right: 20px;
`;

const StyledP = styled.p`
  width: 30%;
  margin: 0;
`;

const Hr = styled.hr`
  border: 1px solid var(--white);
  margin-left: var(--margin-s);
  margin-right: var(--margin-s);
`;
