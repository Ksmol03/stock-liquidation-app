import { queryDatabase } from "../database/mySQL.database.js";

export const authenticateUserController = async (req, res) => {
    const sessionKey = req.cookies.sessionKey;

    if (!sessionKey) {
        return res.status(401).json({message: 'Unauthorized.'});
    }

    const findUserQuery = 'SELECT u.username AS username, u.first_name AS firstName, u.last_name AS lastName, u.email_address AS emailAddress FROM sessions JOIN users u USING (username) WHERE session_key = ?';
    const foundUser = await queryDatabase(findUserQuery, [sessionKey]);

    if (foundUser.length == 0) {
        return res.status(401).json({message: 'Unauthorized.'});
    }

    res.json(foundUser[0]);
}