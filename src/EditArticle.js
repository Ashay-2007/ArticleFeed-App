import React, { useState } from 'react';
import "./EditArticle.css";
import "./Article.css";
import { db, storage } from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';

import { Avatar, makeStyles, Button, FormControl, TextField, IconButton, CircularProgress} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhotoCamera from '@material-ui/icons/PhotoCamera';




const useStyles = makeStyles((theme) => ({
    root: {  
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        // width: '96vh',
        },
    },
    input: {
    display: 'none',
},
formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    // width: 800,
    },
}));

function EditArticle({articleId, username, title, imageUrl, description, timestamp, likes}) {
    const [{user}] = useStateValue();
    const [newTitle, setNewTitle] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [newDescription, setNewDescription] = useState('')
    const [progress, setProgress] = useState(0);
    const [img, setImg] = useState(false)
    const [display, setDisplay] = useState(false)
    const classes = useStyles();
   
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    }
    
    const editTitle = (event) => {
        event.preventDefault();

        db.collection("articles").doc(articleId).update({
            title: newTitle,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setNewTitle("");
    }

    const editDescription = (event) => {
        event.preventDefault();

        db.collection("articles").doc(articleId).update({
            description: newDescription,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setNewDescription("");
    }

    const editImage = (event) => {
        event.preventDefault();

        const uploadTask = storage.ref(`images/${newImage.name}`).put(newImage);
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
                    .child(newImage.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("articles").doc(articleId).update({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageUrl: url,
                        });

                        setProgress(0);
                        setNewImage(null);
                        setImg(false);
                    });
            }
        );
    }

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

    const handleEditChange = () => {
        display === true ? setDisplay(false) : setDisplay(true);
    }


     

    const imageRef = React.useRef(null);

    function useDisplayImage() {
      const [result, setResult] = React.useState("");
  
      function uploader(e) {
        const imageFile = e.target.files[0];
  
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setResult(e.target.result);
        });
  
        reader.readAsDataURL(imageFile);
      }
  
      return { result, uploader };
    }
  
    const { result, uploader } = useDisplayImage();
    
     
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

            
            <div className="editArticle__info">
                <div className="editArticle__likes">
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
                
                <div className="editArticle__button">
                    <Button onClick={handleEditChange} variant="outlined" color="primary">
                        Edit Article
                    </Button>
                </div>
                
            </div>

            <div className="article__likes__people">
                <span>
                    <span>People who have liked this article: </span>
                    {
                        likes.map(person => {
                            return <span>{person}, </span>
                        })
                    }
                </span>
            </div>
            
            {/* <div className="ed_but">
            
            
            </div>   */}
            

            {user && display && (
                <div className="editArticle">

                    <form className={classes.root} noValidate autoComplete="off">
                        <div className="editArticle__title">
                            <TextField className="edit__titleInput" type="text" label="Enter a title..." variant="outlined" onChange={event => setNewTitle(event.target.value)} value={newTitle}/>
                            <Button
                                className="editArticle__postButton"
                                disabled={!newTitle}
                                type="submit"    
                                onClick={editTitle}
                                variant="contained" size="small" color="primary"
                            >
                                Post
                            </Button>
                        </div>
                    </form>

                    <div className="editArticle__image">
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                onChange={(e) => {
                                    setNewImage(e.target.files[0]);
                                    setImg(true)
                                    uploader(e);
                                    }}
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                Choose an Image
                                </Button>
                            </label>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                                </IconButton>
                            </label>
                            <CircularProgress variant="determinate" value={progress} />
                        </div>
                        <Button
                            className="editArticle__postButton"
                            disabled={!newImage}
                            type="submit"    
                            onClick={editImage} variant="contained" size="small" color="primary"
                        >
                            Post
                        </Button>
                    </div>
                    
                    {result && img &&
                        <div className="editArticle__imageContainer">
                            <img className="editArticle__imageDisplay" ref={imageRef} src={result} alt="" />
                        </div>
                    }


                    <form className={classes.root} noValidate autoComplete="off">
                        <div className="editArticle__description">
                            <TextField
                                className="editArticle__descriptionInput"
                                id="outlined-textarea"
                                label="Description"
                                placeholder="Placeholder"
                                multiline
                                rows={8}
                                variant="outlined"
                                onChange={event => setNewDescription(event.target.value)} 
                                value={newDescription}
                            />
                            <Button
                                className="editArticle__postButton"
                                disabled={!newDescription}
                                type="submit"    
                                onClick={editDescription} variant="contained" size="small" color="primary"
                            >
                                Post
                            </Button>
                        </div>
                    </form>

                </div>
                
            )}

            
        </div>
    )
}

export default EditArticle;
