import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider'
import "./Setting.css";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import firebase from "firebase";
import MultiSelect from 'react-multi-select-component';
import { db } from './firebase';

function Setting() {
    const data = [
        { label: "sports", value: "sports"},
        { label: "politics", value: "politics"},
        { label: "space", value: "space"},
        { label: "technology", value: "technology"},
        { label: "travel", value: "travel"},
        { label: "fashion", value: "fashion"}
    ]

    const [{user}] = useStateValue();
    const [display, setDisplay] = useState(false);
    const [displaypref, setDisplayPref] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [options] = useState(data)
    const [preferences, setPreferences] = useState([]);
    const [preferencesValue, setPreferencesValue] = useState([])
    const [currentPreferences, setCurrentPreferences] = useState([]);


    useEffect(() => {
        db.collection("users").where("email",  "==", user? user.email : "test123@gmail.com")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setCurrentPreferences(doc.data().preferences)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [user]);


    useEffect(() => {
        let valArray = [];
        
        preferences.map(pref => valArray.push(pref.value));
        setPreferencesValue(valArray);

    }, [preferences])

    const updatePref = () => {
        // event.preventDefault();

        console.log("trying to updatet pref...")

        db.collection("users").where("email",  "==", user? user.email : "test123@gmail.com")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    db.collection("users").doc(doc.id).update({
                        preferences: preferencesValue
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .then(() => {
                setCurrentPreferences(preferencesValue);
                setPreferences([]);
                setDisplayPref(false);
            });
    }

    const handleEditChange = () => {
        display === true ? setDisplay(false) : setDisplay(true);
    }

    const handlePrefChange = () => {
        displaypref === true ? setDisplayPref(false) : setDisplayPref(true);
    }


    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Ask signed in user for current password.
    // const currentPass = window.prompt('Please enter current password');
    const changePassword = () => {
        console.log(firebase.auth().currentUser)
        const emailCred  = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {
            // User successfully reauthenticated.
                return firebase.auth().currentUser.updatePassword(newPassword)
            })
            .catch(error => {
                // Handle error.
                console.log(error.message);
                alert(error.message);
            })
            .then(() => {
                setOldPassword("");
                setNewPassword("");
                setDisplay(false);
            })
    }
        
    return (
        <div className="setting">
            {/* Username */}
            <span className="setting__span"> 
                <div className="setting__username">
                    Username:
                </div>
                <TextField
                    disabled
                    id="filled-full-width"
                    label={user.displayName}
                    type="text"
                    fullWidth
                    autoComplete="current-password"
                    variant="filled"
                    style={{zIndex:0, overflow:"hidden"}}
                />
                
                
            </span>

            {/* Email */}
            <span> 
                <div className="setting__email">
                    Email:
                </div>
                <TextField
                    disabled
                    id="filled-full-width"
                    label={user.email}
                    fullWidth
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    style={{zIndex:0, overflow:"hidden"}}
                />
            </span>

            {/* prefernces */}
            <span> 
                <div className="setting__preferences">
                    Preferences:
                </div>
                <TextField
                    disabled
                    id="filled-full-width"
                    label={currentPreferences.join(", ")}
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                    variant="filled"
                    style={{zIndex:0, padding:"2px"}}
                    
                />
            </span>

            {/* Change pass button */}
            <div className="setting__password">
                <Button className="button" onClick={handleEditChange} variant="contained" color="primary">Change Password</Button>
            </div>
            
            {user && display && (
                <div className="editArticle">

                    <form noValidate autoComplete="off">
                        <div className="setting__passwordEdit">
                            
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                <OutlinedInput
                                    className="input"
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={event => setOldPassword(event.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={100}
                                />
                            </FormControl>
                                
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                <OutlinedInput
                                    className="input"
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={event => setNewPassword(event.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={110}
                                />
                            </FormControl>

                            <Button onClick={changePassword} variant="outlined" color="primary">
                                Upadate Password
                            </Button>
                           
                            {/* <div className="setting__oldPassword">
                                <TextField className="input" type="password" label="Old Password" variant="outlined" onChange={event => setOldPassword(event.target.value)} value={oldPassword}/>
                            </div>
                            <div className="setting__newPassword">
                                <TextField className="input" type="text" label="New Password" variant="outlined" onChange={event => setNewPassword(event.target.value)} value={newPassword}/>
                            </div> */}
                            
                        </div>
                    </form>
                </div>
            )
            }

            {/* Change pref button */}
            <div>
                <Button className="button" onClick={handlePrefChange} variant="contained" color="primary">Change Preferences</Button>
            </div>

            {user && displaypref && (
                <div className='setting__editPref'>
                    <Button  
                        className='button' 
                        disabled = {!preferencesValue.length}
                        onClick= {updatePref}
                        variant="outlined"
                        color="primary"
                    >
                        Update Preferences
                    </Button>
                    
                    <form>
                        <MultiSelect className="multiselect" value={preferences} options={options} displayValue="label" onChange={setPreferences}/>
                    </form>

                    
                </div>
                            
                
            )
            }
            
        </div>
    )
}

export default Setting;
