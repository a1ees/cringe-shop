import {Link} from "react-router-dom";
import React from "react";

interface Service {
    price: number;
}

interface Item {
    id: number;
    price?: number;
    name: string;
    services?: Service[];
    subcategory?: Item[];
}

const CardTemplate: React.FC<{ item: Item }> = ({ item }) => {
    const findMinPrice = (items: Item): number => {
        if (items.services) {
            const prices = items.services.map(service => service.price);
            return Math.min(...prices);
        } else if (items.subcategory) {
            const prices = items.subcategory.map(findMinPrice);
            return Math.min(...prices);
        } else {
            return items.price || 0;
        }
    };

    const getMinPrice = (item: Item): string => {
        const minPrice = findMinPrice(item);
        return item.services || item.subcategory
            ? `Минимальная стоимость в данной категории: ${minPrice}`
            : `Цена: ${minPrice}`;
    };

    return (
        <Link
            to={item.subcategory || item.services ? `${item.id}` : ""}
            className="card"
        >
            <h2 className="card__name">{item.name}</h2>
            <p className="card__price">{getMinPrice(item)}</p>
        </Link>
    );
}

export default CardTemplate;
