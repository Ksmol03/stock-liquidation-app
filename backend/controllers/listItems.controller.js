import { findPermissionUtil } from "../utils/findPermission.util.js";

export const listItemsController = async (req, res) => {
    try {
        const canUserReadItems = await findPermissionUtil('canReadItems', res.locals.username);
        
        if (!canUserReadItems) {
            return res.status(401).json({message: 'Unauthorized.'});
        }

        return res.json({message: 'git'});

    }   catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error.'});
    }
}