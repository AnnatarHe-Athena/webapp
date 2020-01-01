export function getPermissionObj(user: any) {
  if (!user || !user.role) {
    return {}
  }
  const role = user.role
  const permissionObj: any = {}

  if (role > 90) {
    permissionObj.softRemove = true
  }
  if (role > 110) {
    permissionObj.remove = true
  }

  return permissionObj
}

export function getToken() {
  return sessionStorage.getItem('athena-token')
}
