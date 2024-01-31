import React, {useCallback, useEffect, useState} from 'react';
import cat from '../api/cat.json';
import '../assets/styles/CardTemplate.scss';
import CardTemplate from "./CardTemplate";

const SectionCard = (props) => {
    const [cardList, setCardList] = useState([]);

    const getCardListByPath = useCallback((list, pathArray) => {
        const currentId = Number(pathArray.shift());
        const filteredItem = list.find(item => item.id === currentId);
        if (filteredItem) {
            const newList = filteredItem.services || filteredItem.subcategory;
            return pathArray.length === 0 ? newList : getCardListByPath(newList, pathArray);
        }
        return false;
    }, []);

    const transformItem = (item) => {
        if (item.subcategory) {
            return item.subcategory
        } else if (item.services) {
            return item.services
        } else {
            return [item]
        }
    };

    const getCardListByInput = () => { // возвращаем все айтемы 3го уровня
        const { list } = cat;
        const flatList = (arr) => arr.reduce((acc, item) =>
            acc.concat(transformItem(item)), []);

        return flatList(flatList(list));
    };
    const filteredByInput = () => {
        const cards = getCardListByInput();
        const searchValueUpper = props.searchValue.toUpperCase();
        return cards.filter(card =>
            card.name.toUpperCase().startsWith(searchValueUpper)
        );
    }

    useEffect(() => {
        let {list} = cat;
        if (props.category || props.subcategory) {
            const pathArray = props.pathname.slice(1).split('/');
            const newCardList = getCardListByPath(list, pathArray);
            setCardList(newCardList || []);
        } else {
            setCardList(list);
        }
    }, [props.category, props.pathname, props.subcategory, getCardListByPath])

    return (
        <div className="cards">
            {cardList && !props.searchValue.length && cardList.map((item, index) => (
                <CardTemplate key={index} item={item}/>
            ))}
            {props.searchValue.length && filteredByInput().map((item, index) => (
                <CardTemplate key={index} item={item}/>
            ))}
            {!filteredByInput().length && <div className="card__not-found">Товаров не найдено</div>}
        </div>
    );
};

export default SectionCard;
