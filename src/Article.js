import { Avatar } from '@material-ui/core';
import React from 'react';
import "./Article.css";

function Article({id, username, title, imageUrl, description, timestamp}) {
    return (
        <div className="article">
            {/* header(logo, name of user, date of addition) */}
            <div className="article__header">
                <Avatar 
                    className="article__avatar"
                    alt="Ashay"
                    src="/static/images/avatar1.jpg"
                />
                <div className="article__info">
                    <h3>{username}</h3>
                    <span className="article__timestamp">{timestamp}</span>    
                </div>
            </div>

            {/* title */}
            <div className="article__title">
                <span>{title}</span>
            </div>

            <div className="article__imageContainer">
                <img className="article__image" src={imageUrl} alt=""/>
            </div>
            
            {/* decription paragraph */}
            <div className="article__description">
                <span>{description}</span>
            </div>
        </div>
    )
}

export default Article
