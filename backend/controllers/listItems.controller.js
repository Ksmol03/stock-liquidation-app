import { queryDatabase } from "../database/mySQL.database.js";
import { findPermissionUtil } from "../utils/findPermission.util.js";

export const listItemsController = async (req, res) => {
    try {
        //Check user's permission
        const canUserReadItems = await findPermissionUtil('canReadItems', res.locals.username);
        if (!canUserReadItems) {
            return res.status(401).json({message: 'Unauthorized.'});
        }

        const listItemsQuery = 'SELECT * FROM items';
        const itemsList = await queryDatabase(listItemsQuery);

        return res.json(itemsList);

    }   catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error.'});
    }
}