import { queryDatabase } from "../database/mySQL.database.js";

//Get list of all user's permissions
const getPermissions = async (username) => {
    const getPermissionsQuery = 'SELECT p.permission_name FROM users u JOIN roles r USING (role_id) JOIN permissions_to_roles ptr USING(role_id) JOIN permissions p USING(permission_id) WHERE username = ?';
    const userPermissions = await queryDatabase(getPermissionsQuery, [username]);

    return userPermissions;
};

//Search for specific user's permission
export const findPermissionUtil = async (permission, username) => {
    const permissionsList = getPermissions(username);

    //Leave only permission we are searching for
    permissionsList.filter(perm => {
        if (perm.permission_name == permission) {
            return true;
        } else {
            return false;
        }
    });

    if (permissionsList.lenght == 0) {
        return false;
    } else {
        return true;
    }
}