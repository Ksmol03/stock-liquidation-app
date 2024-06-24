import { queryDatabase } from "../database/mySQL.database.js";

//Search for specific user's permission
export const findPermissionUtil = async (permission, username) => {

    //Get list of all user's permissions
    const getPermissionsQuery = 'SELECT p.permission_name FROM users u JOIN roles r USING (role_id) JOIN permissions_to_roles ptr USING(role_id) JOIN permissions p USING(permission_id) WHERE username = ?';
    let permissionsList = await queryDatabase(getPermissionsQuery, [username]);

    //Leave only permission we are searching for
    permissionsList = permissionsList.filter(perm => {
        if (perm.permission_name == permission) {
            return true;
        } else {
            return false;
        }
    });

    if (permissionsList.length == 0) {
        return false;
    } else {
        return true;
    }
}