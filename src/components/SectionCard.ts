import React, {useCallback, useEffect, useState} from 'react';
import cat from "../api/cat.json"
import '../assets/styles/CardTemplate.scss';
import CardTemplate from "./CardTemplate";

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
    price: number;
}

interface SectionCardProps {
    category?: string;
    searchValue: string;
    pathname?: string;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
    const [cardList, setCardList] = useState<Item[]>([]);

    const getCardListByPath = useCallback((list: Item[] | Service[] | undefined, pathArray: string[]): Service[] | Item[] | undefined | false => {
        if (list === undefined) {
            return false;
        }

        const currentId = Number(pathArray.shift());
        const filteredItem = list.find(item => item.id === currentId);

        if (filteredItem) {
            if ('services' in filteredItem) {
                const newList = filteredItem.services || filteredItem.subcategory;
                return pathArray.length === 0 ? newList : getCardListByPath(newList, pathArray);
            } else {
                return false;
            }
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

    const getCardListByInput = (): Item[] => {
        let { list } = cat;

        const flatList = (arr: (Service | Item)[]): Item[] =>
            arr.reduce((acc, item) => acc.concat(transformItem(item)), [] as Item[]);

        return flatList(flatList(list));
    };

    const filteredByInput = () => {
        const cards = getCardListByInput();
        const searchValueUpper = props.searchValue.toUpperCase();
        return cards.filter(card =>
            card.name.toUpperCase().startsWith(searchValueUpper)
        );
    }

    const filteredCards = filteredByInput();

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
