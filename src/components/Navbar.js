import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from "date-fns";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import './Navbar.css';
import { incrementDate, decrementDate, setDate } from '../features/forms/formsSlice';

export const Navbar = (props) => {
    const selectedDate = useSelector(state => parseISO(state.forms.selectedDate));
    const localeDateString = selectedDate.toLocaleDateString();
    const options = { weekday: 'long' };
    const selectedDay = new Intl.DateTimeFormat('en-US', options).format(selectedDate);

    const dispatch = useDispatch();

    const [pickedDate, setPickedDate] = useState('');
    const [showDayPicker, setShowDayPicker] = useState(false);

    const handleDayClick = (day) => {
        setPickedDate(day);
        dispatch(setDate(day.toISOString()));
        setShowDayPicker(false);
    }
    
    const handleClick = (e) => {
        if (e.target.classList.contains('left-chevron')) {
            dispatch(decrementDate())
        } else if (e.target.classList.contains('right-chevron')) {
            dispatch(incrementDate());
        } else {
            dispatch(setDate(new Date().toISOString()));
        }
    }

    const toggleShowDayPicker = () => {
        setShowDayPicker(!showDayPicker);
    }
    
    return (
        <div className="navbar">
            <div className="buttons-container">
                <button className="left-chevron" onClick={handleClick}><i className="chevron left-chevron">chevron_left</i></button>
                <button className="todayButton" onClick={handleClick}>Today</button>
                <button className="calendar-button" onClick={toggleShowDayPicker}><img className="calendar-icon" src='icons/calendar.png' alt="calendar icon" />
                </button>

                {showDayPicker && <DayPicker onDayClick={handleDayClick} selectedDays={pickedDate}/>}
                

                <button className="right-chevron" onClick={handleClick}><i className="chevron right-chevron">chevron_right</i></button>
            </div>
            <p>{selectedDay}, {localeDateString}</p>
            
        </div>
    )
}
