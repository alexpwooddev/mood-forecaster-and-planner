import React from 'react';
import { useDispatch } from 'react-redux';

import './Navbar.css';
import { incrementDate, decrementDate, setDate } from '../features/forms/formsSlice';

export const Navbar = (props) => {
    // const selectedDate = useSelector(state => state.forms.selectedDate);
    const dispatch = useDispatch();
    
    const handleClick = (e) => {
        if (e.target.classList.contains('left-chevron')) {
            dispatch(decrementDate())
        } else if (e.target.classList.contains('right-chevron')) {
            dispatch(incrementDate());
        } else {
            dispatch(setDate(new Date().toISOString()));
        }
    }
    
    return (
        <div className="navbar">
            <button className="left-chevron" onClick={handleClick}><i className="chevron left-chevron">chevron_left</i></button>
            <button className="todayButton" onClick={handleClick}>Today</button>
            <button className="calendar-button"><img className="calendar-icon" src='icons/calendar.png' alt="calendar icon" /></button>
            <button className="right-chevron" onClick={handleClick}><i className="chevron right-chevron">chevron_right</i></button>
        </div>
    )
}
