import React, { useState } from 'react';
import { storage, db } from './firebase';
import firebase from "firebase";
import './NewArticle.css';
import { useStateValue } from './StateProvider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, InputLabel, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LinearProgress from '@material-ui/core/LinearProgress';

import PropTypes from 'prop-types';



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

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
}
  
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};
  

function NewArticle({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [img, setImg] = useState(false);
    const [{user}] = useStateValue();
    const classes = useStyles();
    
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
                            category: category,
                            likes:[]
                        });

                        setProgress(0);
                        setTitle("");
                        setImage(null);
                        setDescription("");
                        setImg(false);

                    });
            }
        );
    };


    const imageRef = React.useRef(null);

    function useDisplayImage() {
        const [result, setResult] = React.useState("");

        function uploader(e) {
            const imageFile = e.target.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", (e) => {
                setResult(e.target.result);
                setImg(true)
            });

            reader.readAsDataURL(imageFile);
        }

        return { result, uploader };
    }

  const { result, uploader } = useDisplayImage();
  
    

    return (
        <div>
            {user ? (
        
                <div>

                    <div className="newArticle__pageTitle">
                        <span>Create a new article</span>
                    </div>

                    <div className="newArticle__container">


                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category} 
                            onChange={e => setCategory(e.target.value)}
                            label="Category"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                                <MenuItem value="sports">Sports</MenuItem>
                                <MenuItem value="politics">Politics</MenuItem>
                                <MenuItem value="space">Space</MenuItem>
                                <MenuItem value="technology">Technology</MenuItem>
                                <MenuItem value="travel">Travel</MenuItem>
                                <MenuItem value="fashion">Fashion</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <div className="newArticle__title">

                            <form className={classes.root} noValidate autoComplete="off">
                                <div>
                                <TextField className="newArticle__titleInput" type="text" label="Enter a title..." variant="outlined" onChange={event => setTitle(event.target.value)} value={title}/>
                            
                                </div>
                            </form>
                            {/* <FormControl variant="outlined" className={classes.root}>
                                </FormControl>
                             */}
                        </div>

                        <div className="newArticle__image">
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
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
                        </div>
                        
                        {result && img &&
                        <div className="newArticle__imageContainer">
                            <img className="newArticle__imageDisplay" ref={imageRef} src={result} alt="" />
                        </div>
                        }


                        {/* <textarea className="newArticle__description"  placeholder="Enter decription of the article..." /> */}
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    className="newArticle__descriptionInput"
                                    id="outlined-textarea"
                                    label="Description"
                                    placeholder="Placeholder"
                                    multiline
                                    rows={8}
                                    variant="outlined"
                                    onChange={event => setDescription(event.target.value)} 
                                    value={description}
                                />
                            </div>
                        </form>

                        {/* <progress className="newArticle__uploadProgress" value={progress} max="100"/> */}

                        <div>
                            
                            <Button
                                className="newArticle__button" 
                                onClick={handleUpload}
                                variant="contained"
                                color="primary"
                                disabled = {!title || !description || !image || !category}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload
                            </Button>
                            
                        </div>

                        <div className={classes.root}>
                            <LinearProgressWithLabel value={progress} />
                        </div>
                                                
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
