import React from 'react';
import '../../assets/styles/ThemeSelect.scss';

interface ThemeSelectProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const isInputChecked = (currentTheme: string) => {
        return currentTheme === 'dark';
    };

    return (
        <div className='page__theme-select theme-select'>
            <label className="theme-select__switch">
                <input type="checkbox" onChange={toggleTheme} checked={isInputChecked(theme)}/>
                <span className="theme-select__slider round"></span>
            </label>
        </div>
    );
};

export default ThemeSelect;
