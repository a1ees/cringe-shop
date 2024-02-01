import React, {useCallback, useEffect, useState} from 'react';
import cat from "../api/cat.json"
import '../assets/styles/CardTemplate.scss';
import CardTemplate from "./CardTemplate";
import {useLocation} from "react-router-dom";

interface Item {
    id: number;
    name: string;
    description: string;
    tag: string;
    services?: Service[];
    subcategory?: Item[];
}

interface Service {
    id: number;
    code: string;
    name: string;
    description: string;
    tag: string;
    price: number;
}

interface SectionCardProps {
    category?: string;
    searchValue: string;
    pathname?: string;
    subcategory?: Boolean;

}

interface Cat {
    list: any[];
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
    const [cardList, setCardList] = useState<Item[]>([]);
    let {list}: Cat = cat;

    const location = useLocation();
    const pathname = location.pathname;

    const getCardListByPath = useCallback((list: Item[] | Service[] | undefined, pathArray: string[]): Service[] | Item[] | undefined | false => {
        if (list === undefined) {
            return false;
        }
        const currentId = Number(pathArray.shift());
        const filteredItem = list.find(item => item.id === currentId);
        if (filteredItem) {
            const newList = (filteredItem as Item).services || (filteredItem as Item).subcategory;
            return pathArray.length === 0 ? newList : getCardListByPath(newList, pathArray);
        }
        return false;
    }, []);

    const transformItem = (item: Item): Service[] | Item[] => {
        if (item.subcategory) {
            return item.subcategory
        } else if (item.services) {
            return item.services
        } else {
            return [item]
        }
    };

    const getCardListByInput = (list: Array<Item>): Item[] => {
        const flatList = (arr: (Service | Item)[]): Item[] =>
            arr.reduce((acc, item) => acc.concat(transformItem(item)), [] as Item[]);

        return flatList(flatList(list));
    };

    const filteredByInput = (list: Array<Item>) => {
        const cards = getCardListByInput(list);
        const searchValueUpper = props.searchValue.toUpperCase();
        return cards.filter(card =>
            card.name.toUpperCase().startsWith(searchValueUpper)
        );
    }
    const filteredCards = filteredByInput(list);

    useEffect(() => {
        if (props.category || props.subcategory) {
            const pathArray = pathname.slice(1).split('/');
            const newCardList = getCardListByPath(list, pathArray);
            setCardList(newCardList || []);
        } else {
            setCardList(list);
        }
    }, [list, pathname, props.category, props.subcategory, getCardListByPath])
    return (
        <div className="container__cards">
            {cardList && !props.searchValue.length
                ? cardList.map((item, index) => <CardTemplate key={index} item={item}/>)
                : props.searchValue.length
                    ? filteredCards.map((item, index) => <CardTemplate key={index} item={item}/>)
                    : !filteredCards.length
                        ? <div className="card__not-found">Товаров не найдено</div>
                        : null
            }
        </div>
    );
};

export default SectionCard;
