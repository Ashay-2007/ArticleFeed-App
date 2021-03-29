import React, { useEffect, useState } from 'react';
import Article from './Article';
import "./Dashboard.css";
import { db } from './firebase';
import { useStateValue } from './StateProvider';

function Dashboard() {
    const [{user}] = useStateValue();
    const [articles, setArticles] = useState([]);
    const [preferences, setPreferences] = useState([]);

    useEffect(()=>{
        db.collection('articles').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setArticles(snapshot.docs.map(doc => ({
            id: doc.id,
            article: doc.data()
          })));
        })
    }, []);

    useEffect(() => {
        db.collection("users").where("email",  "==", user? user.email : "test123@gmail.com")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setPreferences(doc.data().preferences)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [user]);

    return (
        <div className="dashboard">
            
            {user ? (
                <div className="dashboard__articles">
                    <div className="dashboard__info">
                        <p> Here are the articles as per your preferences.</p>
                        {console.log(user.displayName)}
                    </div>
                    {
                        articles.map(({id, article}) => {
                            
                            if(preferences.includes(article.category))
                                return (
                                    <Article key={id} articleId={id} user={user} username={article.username} title={article.title} imageUrl={article.imageUrl} description={article.description} likes={article.likes} timestamp={new Date(article.timestamp?.toDate()).toUTCString()}/>
                                )
                                
                        })      
                    
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
