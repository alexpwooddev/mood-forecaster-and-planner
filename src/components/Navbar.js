import React from 'react';

import './Navbar.css';

export const Navbar = (props) => {
    return (
        <div className="navbar">
            <button><i className="chevron">chevron_left</i></button>
            <button>Today</button>
            <button className="calendar-button"><img className="calendar-icon" src='icons/calendar.png' alt="calendar icon" /></button>
            <button><i className="chevron">chevron_right</i></button>
        </div>
    )
}
