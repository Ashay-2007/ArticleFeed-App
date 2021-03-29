import React, { useEffect, useState } from 'react';
import Article from './Article';
import "./CategoryArticles.css";
import { db } from './firebase';
import { useStateValue } from './StateProvider';

function CategoryArticles({category}) {
    const [{user}] = useStateValue();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        db.collection('articles').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setArticles(snapshot.docs.map(doc => ({
            id: doc.id,
            article: doc.data()
          })));
        })
      }, []);

    return (
        <div className="category">
            
            <div className="category__articles">
                <p>Welcome {!user? "Guest" : user.displayName} ! Here are the recent {category} articles </p>
                {
                articles.map(({id, article}) => {

                    if(article.category === category)
                        return <Article key={id} articleId={id} user={user} username={article.username} title={article.title} imageUrl={article.imageUrl} description={article.description} likes={article.likes} timestamp={new Date(article.timestamp?.toDate()).toUTCString()}/>
                         
                    })
                }
            </div>
        </div>
    )
}

export default CategoryArticles;
