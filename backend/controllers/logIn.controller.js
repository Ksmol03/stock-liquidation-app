import { queryDatabase } from "../database/mySQL.database.js";
import bcypt from 'bcrypt';
import crypto from 'crypto';

export const logInController = async (req, res) => {

    const {username, password} = req.body;

    //Check if user is already logged in
    if (req.cookies.sessionKey) {
        return res.status(409).json({message: 'Already logged in.'});
    }

    //Check if user send username and password
    if (!username || !password) {
        return res.status(401).json({message: 'Invalid username or password.'})
    }

    try {
        //Check if username exists
        const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
        const checkUsernameResult = await queryDatabase(checkUsernameQuery, [username]);
        if (checkUsernameResult.length == 0) {
            return res.status(401).json({message: 'Invalid username or password.'})
        }

        //Validate password
        const user = checkUsernameResult[0];
        if (!bcypt.compareSync(password, user.hashed_password)) {
            return res.status(401).json({message: 'Invalid username or password.'})
        }

        //Send session key to user
        const sessionKey = crypto.randomBytes(16).toString('hex');
        const insertSessionKeyToSessions = 'INSERT INTO sessions (session_key, username) VALUES (?, ?)';
        const resultSessionKeyToSessions = await queryDatabase(insertSessionKeyToSessions, [sessionKey, username]);
        res.cookie('sessionKey', sessionKey, {
            httpOnly: true,
            maxAge: 1000* 60 * 60 * 24, // 1 day in milliseconds
            path: '/'
        });
        return res.json({message: 'Successfully logged in.'})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error.'});
    }
}
    