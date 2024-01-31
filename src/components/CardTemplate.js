import {Link} from "react-router-dom";
import React from "react";

const CardTemplate = (props) => {
    const findMinPrice = (items) => {
        if (items.services) {
            const priceArr = items.services.map((i) => i.price);
            return Math.min(...priceArr);
        } else if (items.subcategory) {
            const subcategoryMinPrices = items.subcategory.map(findMinPrice);
            return Math.min(...subcategoryMinPrices);
        } else {
            return items.price || 0;
        }
    };

    const getMinPrice = (item) => {
        const minPrice = findMinPrice(item);
        return item.services || item.subcategory
            ? `Минимальная стоимость в данной категории: ${minPrice}`
            : `Цена: ${minPrice}`;
    };

    return (
        <Link
            to={props.item.subcategory || props.item.services ? `${props.item.id}` : ""}
            className="card"
        >
            <h2 className="card__name">{props.item.name}</h2>
            <p className="card__price">{getMinPrice(props.item)}</p>
        </Link>
    );
}

export default CardTemplate;
