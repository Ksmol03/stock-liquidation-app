import { queryDatabase } from "../database/mySQL.database.js";

export const getPermissionsMiddleware = async (username) => {
    const getPermissionsQuery = 'SELECT p.permission_name FROM users u JOIN roles r USING (role_id) JOIN permissions_to_roles ptr USING(role_id) JOIN permissions p USING(permission_id) WHERE username = ?';
    const userPermissions = await queryDatabase(getPermissionsQuery, [username]);

    return userPermissions;
};