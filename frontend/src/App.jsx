import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import LogIn from './components/LogIn';
import Panel from './components/Panel';
import ErrorPanel from './components/Error';

export const AuthContext = createContext();

const App = () => {
    const [userData, setUserData] = useState(null);
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        //Check if user is logged in
        authenticateUser(setUserData);
    }, []);

    //Set userData if user is authenticated
    const authenticateUser = () => {
        axios
            .get('/api/authenticate')
            .then((response) => {
                const data = response.data;
                if (data.message == 'Unauthenticated.') {
                    console.log(data.message);
                    setUserData(null);
                } else {
                    console.log(data);
                    setUserData(data);
                }
            })
            .catch((error) => {
                setServerError(true);
                console.error('Error: ', error);
            });
    };

    //Check if server error has been thrown
    if (serverError) {
        return <ErrorPanel />;
    }

    //App
    return (
        <AuthContext.Provider value={{ userData, setUserData, authenticateUser, setServerError }}>
            {userData ? <Panel /> : <LogIn />}
        </AuthContext.Provider>
    );
};

export default App;
