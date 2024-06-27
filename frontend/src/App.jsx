import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    axios.get('/api/authenticate')
      .then(response => {
        if (response.status == 200) {
          console.log('Authenticated!');
          setUserData(response.data);
        }
      })
      .catch(err => console.log('Error: ', err));
  }

  const logIn = () => {
    axios.post('/api/login', {username: 'admin', password: 'admin'})
      .then(() => {
        authenticateUser();
      });
  };

  const logOut = () => {
    axios.delete('/api/logout');
    setUserData(null);
  }

  if (userData) {
    return (
      <>
        <div>Hello, {userData.username}!</div>
        <button onClick={logOut}>Log Out</button>
      </>
    )
  } else {
    return (
      <>
        <div>Please, Log In</div>
        <button onClick={logIn}>Log In</button>
      </>
    )
  }
}

export default App