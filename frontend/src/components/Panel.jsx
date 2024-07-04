import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';

const Panel = ({ setUserData }) => {
    const { setServerError } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    //Handle logout
    const logout = () => {
        setLoading(true);

        axios
            .delete('/api/logout')
            .then(() => {
                setUserData(null);
                setLoading(false);
            })
            .catch((error) => {
                setServerError(true);
                console.error('Error: ', error);
            });
    };

    return (
        <>
            <div>Panel</div>
            <button onClick={() => logout()}>Log Out</button>
            {loading && <div className='loading-div'></div>}
        </>
    );
};

export default Panel;
