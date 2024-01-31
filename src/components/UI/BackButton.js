import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/BackButton.scss';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        const currenPathArr = location.pathname.slice(1).split('/')
        currenPathArr.pop();

        navigate(`/${currenPathArr.join('/')}`);
    };

    const shouldShowButton = location.pathname !== '/';

    return (
        shouldShowButton && (
            <button className="back-button" onClick={goBack}>
                Назад
            </button>
        )
    );
}

export default BackButton;

