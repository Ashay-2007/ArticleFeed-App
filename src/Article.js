import { Avatar } from '@material-ui/core';
import React from 'react';
import "./Article.css";

function Article({username, date}) {
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
                    <span className="article__timestamp">{date}</span>    
                </div>
            </div>

            {/* title */}
            <div className="article__title">
                <span>Prithvi Shaw is behind in the selection queue because India has Shubman Gill: VVS Laxman</span>
            </div>
            
            {/* decription paragraph */}
            <div className="article__description">
                <span>Former cricketer-turned-commentator VVS Laxman feels opening batsman Prithvi Shaw is going to have to wait for his chance to play for the Indian team again despite his recent exploits in the Vijay Hazare Trophy.Shaw, who was dropped from the Indian team after a disastrous tour of Australia earlier this year, amassed a staggering 827 runs from 8 matches at an average of 165.40 with 4 hundreds and a half-century in Mumbai's triumphant campaign in the List A tournament.But the 21-year-old still couldn't find a place in the Indian ODI team which is currently taking on England in a 3-match series in Pune. Shaw had played the first Test against Australia in Adelaide in December last year in which he managed 0 and 4 runs before being replaced by Shubman Gill for the next three games.Gill sealed his spot as the Test opener alongside Rohit Sharma after amassing 259 runs in 6 innings at 51.80 with 2 half-centuries. He then replaced Shaw in the ODI squad as the reserve opener to Rohit and Shikhar Dhawan in Australia and against England in the ongoing series.“I think, definitely, the way Prithvi Shaw performed, and probably as a captain, he led Mumbai to win the Vijay Hazare Trophy. I think he deserves to be a part of the ODI squad but the way the selectors have gone about selecting the squad is whoever have been performers, they have made a sort of a line or a queue.</span>
            </div>
            </div>
    )
}

export default Article
