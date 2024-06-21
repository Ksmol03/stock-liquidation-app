import { queryDatabase } from "../database/mySQL.database.js";
import bcypt from 'bcrypt';
import crypto from 'crypto';

export const logInController = async (req, res) => {
    const {username, password} = req.body;
    const sessionKey = req.cookies.sessionKey;

    //Check if user is already logged in
    if (req.cookies.sessionKey) {
        return res.status(409).json({message: 'Already logged in.'});
    }

    //Check if user send username and password
    if (!username || !password) {
        return res.status(401).json({message: 'Invalid username or password.'})
    }

    //Check if username exists
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    const checkUsernameResult = await queryDatabase(checkUsernameQuery, [username]);
    console.log(checkUsernameResult)
    if (checkUsernameResult.length == 0) {
        return res.status(401).json({message: 'Invalid username or password.'})
    }

    //Validate password
    const user = checkUsernameResult[0];
    console.log(password);
    console.log(user.hashed_password);
    if (!bcypt.compareSync(password, user.hashed_password)) {
        return res.status(401).json({message: 'Invalid username or password.'})
    }
}