import React, { useEffect, useState } from 'react'
import EditArticle from './EditArticle';
import "./EditPage.css"
import { db } from './firebase';
import { useStateValue } from './StateProvider'

function EditPage() {
    const [articles, setArticles] = useState([])
    const [{user}] = useStateValue();
    
    // const handleChange = (e) => {
    //     if(e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
        
    // }

    useEffect(()=> {
        db.collection('articles').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setArticles(snapshot.docs.map(doc => ({
            id: doc.id,
            article: doc.data()
          })));
        })
    }, []);

    return (

        <div className="editPage">

            <div className="editPage__info">
                <p>Welcome {!user? "Guest" : user.displayName} ! Here are your past articles</p>
            </div>
            
            <div className="editPage__articles">
                {
                    articles.map(({id, article}) => {

                        if(article.username === user.displayName)
                            return (
                                <div className="art">
                                    <EditArticle key={id} articleId={id} user={user} username={article.username} title={article.title} imageUrl={article.imageUrl} description={article.description} likes={article.likes} timestamp={new Date(article.timestamp?.toDate()).toUTCString()}/>
                                </div>
                            )
                    })
                }
            </div>
            
    
        </div>
    )
}

export default EditPage
