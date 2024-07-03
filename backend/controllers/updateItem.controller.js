import { queryDatabase } from '../database/mySQL.database.js';
import { findPermissionUtil } from '../utils/findPermission.util.js';

export const updateItemController = async (req, res) => {
    const { liquidationDate, itemId } = req.body;

    //Check if arguments are passed
    if (!liquidationDate || !itemId) {
        return res.status(400).json({ message: 'Bad request.' });
    }

    try {
        //Check user's permission
        const canUserUpdateItems = await findPermissionUtil('canUpdateItems', res.locals.username);
        if (!canUserUpdateItems) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        //Update item
        const updateItemQuery = 'UPDATE items SET liquidation_date = ? WHERE item_id = ? AND liquidation_date IS NULL';
        const updateItemResult = await queryDatabase(updateItemQuery, [liquidationDate, itemId]);

        //Check if item was updated
        if (updateItemResult.affectedRows == 0) {
            return res.status(400).json({ message: 'Bad request.' });
        }

        return res.json({ message: 'Updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
