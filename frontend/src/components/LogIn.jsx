import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';

const LogIn = ({ authenticateUser }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { setServerError } = useContext(AuthContext);

    //Update username and password inputs
    const updateCredentials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    //Handle login
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post('/api/login', credentials)
            .then(() => {
                authenticateUser();
                setCredentials({ username: '', password: '' });
                setLoading(false);
            })
            .catch((error) => {
                setServerError(true);
                console.error('Error: ', error);
            });
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
            {loading && <div className='loading-div'></div>}
        </>
    );
};

export default LogIn;
