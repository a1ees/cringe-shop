import React, { ChangeEvent } from 'react';
import "../../assets/styles/Input.scss"
import {useNavigate} from "react-router-dom";

interface InputProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ searchValue, setSearchValue }) => {
    const navigate = useNavigate();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        navigate('/');
    };

    return (
        <input
            value={searchValue}
            onChange={handleSearchChange}
            placeholder='Поиск'
            className="input"
        />
    );
};

export default Input;

