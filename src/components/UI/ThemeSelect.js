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
        <div className='page__theme-select theme-select'>
            <label className="theme-select__switch">
                <input type="checkbox" onChange={toggleTheme} checked={isInputChecked(props.theme)}/>
                <span className="theme-select__slider round"></span>
            </label>
            <span></span>
        </div>
    );
};

export default ThemeSelect;
