import { queryDatabase } from "../database/mySQL.database.js";

export const logOutController = async (req, res) => {
    const sessionKey = req.cookies.sessionKey;

    //Check if user is logged in
    if (!sessionKey) {
        return res.status(409).json({message: 'Already logged out.'});
    }

    try {
        //Clear user's session
        res.clearCookie('sessionKey');
        const deleteSessionQuery = 'DELETE FROM sessions WHERE session_key = ? AND EXISTS (SELECT * FROM sessions WHERE session_key = ?)';
        await queryDatabase(deleteSessionQuery, [sessionKey, sessionKey]);
        return res.json({message: 'Successfully logged out.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error.'});
    }
}