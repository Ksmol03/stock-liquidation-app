import axios from 'axios';

export const authenticateUser = (setUserData) => {
    axios.get('/api/authenticate')
        .then(response => {
            const data = response.data;
            if (data.message == 'Unauthorized.') {
                console.log(data.message);
                setUserData(null);
            } else {
                console.log(data);
                setUserData(data);
            }
        });
}