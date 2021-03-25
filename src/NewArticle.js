import React, { useEffect, useState } from 'react';
import { storage, db } from './firebase';
import firebase from "firebase";
import './NewArticle.css';
import Article from './Article';
import { useStateValue } from './StateProvider';

function NewArticle({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [articles, setArticles] = useState([])
    const [{user}] = useStateValue();
    
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    useEffect(()=>{
        db.collection('articles').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setArticles(snapshot.docs.map(doc => ({
            id: doc.id,
            article: doc.data()
          })));
        })
      }, []);

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("articles").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            title: title,
                            imageUrl: url,
                            description: description,
                            username: user.displayName,
                            category: category
                        });

                        setProgress(0);
                        setTitle("");
                        setImage(null);
                        setDescription("");

                    });
            }
        );
    };

    return (
        <div>
            {user ? (
        
                <div>
                    <div className="newArticle__container">
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="sports">Sports</option>
                            <option value="politics">Politics</option>
                            <option value="space">Space</option>
                            <option value="technology">Technology</option>
                            <option value="travel">Travel</option>
                            <option value="fashion">Fashion</option>
                        </select>
                        <input className="newArticle__title" type="text" placeholder="Enter a title..." onChange={event => setTitle(event.target.value)} value={title}/>
                        <input type="file" onChange={handleChange}/>
                        <textarea className="newArticle__description" type="text" placeholder="Enter decription of the article..." onChange={event => setDescription(event.target.value)} value={description}/>
                        <button className="newArticle__button" onClick={handleUpload}>
                            Upload
                        </button>
                        <progress className="newArticle__uploadProgress" value={progress} max="100"/>
                    </div>
                    
                    <div className="newArticle__pastArticles">
                        <p>Welcome {!user? "Guest" : user.displayName} ! Here are your past articles</p>
                
                        {
                        articles.map(({id, article}) => {

                            if(article.username === user.displayName)
                                return <Article key={id} articleId={id} user={user} username={article.username} title={article.title} imageUrl={article.imageUrl} description={article.description} timestamp={new Date(article.timestamp?.toDate()).toUTCString()}/>
                                
                            })
                        }
                
                    </div>
                </div>
        
            ) :
            (
                <p>Please log in to continue</p>
            )
            }
    
        </div>
         
        
    )
}

export default NewArticle;
