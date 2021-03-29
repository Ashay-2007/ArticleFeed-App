import { Avatar, FormControl, IconButton } from '@material-ui/core';
import React from 'react';
import "./Article.css";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import firebase from "firebase";

function Article({articleId, username, title, imageUrl, description, likes, timestamp}) {
    const [{user}] = useStateValue();

    const like = (event) => {
        db.collection("articles").doc(articleId).update({
            likes : firebase.firestore.FieldValue.arrayUnion(user.displayName)
        });
    }

    const dislike = (event) => {
        db.collection("articles").doc(articleId).update({
            likes : firebase.firestore.FieldValue.arrayRemove(user.displayName)
        });
    }

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

            <div className="likes">
                {likes.includes(user.displayName) ? (
                    <FormControl>
                        <IconButton variant="contained" style={{color:"#ed4956",outline:"none"}} type="submit" onClick={dislike}> 
                            <FavoriteIcon/>
                        </IconButton>
                    </FormControl>
                    
                    )  : (
                    <FormControl>
                        <IconButton variant="contained" style={{outline:"none"}} type="submit" onClick={like}> 
                            <FavoriteBorderIcon/>
                        </IconButton>
                    </FormControl>
                    )
                }
    
                <span>{likes.length} Likes</span>
            </div>
        </div>
    )
}

export default Article;
