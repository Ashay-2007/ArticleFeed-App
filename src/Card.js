import React from 'react';
import "./Card.css";

function Card({img, title}) {
    return (
        <div className="card">
            <img className="card__img" src={img} alt="logo"/>
            <div className="card__info">
                <h2 className="card__title">{title}</h2>
            </div>
        </div>
    )
}

export default Card
