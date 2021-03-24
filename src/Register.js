import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Multiselect } from "multiselect-react-dropdown";
import "./Register.css";

function Register() {
    const data = [
        { interest: "sports", id: 1},
        { interest: "politics", id: 1},
        { interest: "space", id: 1},
        { interest: "technology", id: 1},
        { interest: "travel", id: 1},
        { interest: "fashion", id: 1}
    ]

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [options] = useState(data)
    
    return (
        <div className='register'>
            <Link to='/'>
                <img
                    className="register__logo"
                    src='data:image/png;base64,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' 
                    alt="logo"
                />
            </Link>

            <div className='register__container'>
                <h1>Sign-up</h1>

                <form>
                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <h5>Preferences</h5>
                    <Multiselect options={options} displayValue="interest"/>

                </form>

                <p>
                    By signing-up you agree to the ARTICLE FEED FAKE APP Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button  className='register__signupButton'>Create your ArticleFeed Account</button>
            </div>
        </div>
    )
}

export default Register;
