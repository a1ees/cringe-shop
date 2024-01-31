import React from 'react';
import '../../assets/styles/ThemeSelect.scss'

const ThemeSelect = (props) => {
    const toggleTheme = () => {
        props.setTheme(props.theme === 'dark' ? 'light' : 'dark');
    };
    const isInputChecked = (theme) => {
       return theme === 'dark'
    }

    return (
        <div className='theme-select'>
            <label className="switch">
                <input type="checkbox" onChange={toggleTheme} checked={isInputChecked(props.theme)} />
                <span className="slider round"></span>
            </label>
            <span></span>
        </div>
    );
};

export default ThemeSelect;
