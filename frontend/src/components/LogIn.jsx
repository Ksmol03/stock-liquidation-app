import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';

const LogIn = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { authenticateUser, setServerError } = useContext(AuthContext);

    //Update username and password inputs
    const updateCredentials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    //Submit login
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/login', credentials).catch((error) => {
            setServerError(true);
            console.error('Error: ', error);
        });
        authenticateUser();
    };

    return (
        <>
            <div>LogIn Panel</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    name='username'
                    type='text'
                    onChange={(e) => updateCredentials(e)}
                    value={credentials.username}
                />
                <input
                    name='password'
                    type='password'
                    onChange={(e) => updateCredentials(e)}
                    value={credentials.password}
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default LogIn;
