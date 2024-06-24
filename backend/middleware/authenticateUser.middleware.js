import { queryDatabase } from "../database/mySQL.database.js";

export const authenticateUserMiddleware = async (req, res, next) => {
    const sessionKey = req.cookies.sessionKey;

    //Check if user is logged in
    if (!sessionKey) {
        return res.status(401).json({message: 'Unauthorized.'});
    }

    try {
        //Find username based on session key
        const findUsernameQuery = 'SELECT username FROM sessions WHERE session_key = ?';
        const foundUsername = await queryDatabase(findUsernameQuery, [sessionKey]);

        if (foundUsername.length == 0) {
            return res.status(401).json({message: 'Unauthorized.'});
        }

        //Save found username in res.locals
        res.locals.username = foundUsername[0].username;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error.'});
    }
}