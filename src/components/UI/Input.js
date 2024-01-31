import * as React from 'react';
import "../../assets/styles/Input.scss"
import {useNavigate} from "react-router-dom";

const Input = (props) => {
    const navigate = useNavigate()
    const handleSearchChange = (event) => {
        props.setSearchValue(event.target.value);
        navigate('/')
    };
    return (
            <input
                value={props.searchValue}
                onChange={handleSearchChange}
                placeholder='Поиск'
                className="input"
            />
    );
}

export default Input;

