import React, { useEffect, useState } from 'react';
import Article from './Article';
import "./Dashboard.css";
import { db } from './firebase';
import { useStateValue } from './StateProvider';

function Dashboard() {
    const [{user}] = useStateValue();
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        db.collection('articles').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setArticles(snapshot.docs.map(doc => ({
            id: doc.id,
            article: doc.data()
          })));
        })
    }, []);

    return (
        <div className="dashboard">
            {user ? (
                <div className="dashboard__articles">
                <p>Welcome {!user? "Guest" : user.displayName} ! Here are the article as per your preferences.</p>
                {
                    articles.map(({id, article}) =>(
                        <Article key={id} articleId={id} user={user} username={article.username} title={article.title} imageUrl={article.imageUrl} description={article.description} timestamp={new Date(article.timestamp?.toDate()).toUTCString()}/>
                    ))      
                
                }
            </div>
            ) : (
                <p>Please log in to see your personalized dashboard</p>
            )
            
            }
            
        </div>
    )
}

export default Dashboard
