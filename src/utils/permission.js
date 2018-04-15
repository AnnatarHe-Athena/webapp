export function getPermissionObj(user) {
  if (!user || !user.role) {
    return {}
  }
  const role = user.role
  const permissionObj = {}

  if (role > 90) {
    permissionObj.softRemove = true
  }
  if (role > 110) {
    permissionObj.remove = true
  }

  return permissionObj
}
