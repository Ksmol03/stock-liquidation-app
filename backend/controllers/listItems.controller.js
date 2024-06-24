import { getPermissionsMiddleware } from "../middleware/getPermissions.middleware.js"

export const listItemsController = async (req, res) => {
    try {
        const userPermissions = await getPermissionsMiddleware(res.locals.username);
        return res.json(userPermissions)
    }   catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error.'});
    }
}