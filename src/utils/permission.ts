import { TUser } from "../types/user"

type PermissionObj = {
  remove: boolean,
  softRemove: boolean
}


export function getPermissionObj(user: TUser): PermissionObj {
  if (!user || !user.role) {
    return { remove: false, softRemove: false }
  }
  const role = user.role
  const permissionObj = {} as PermissionObj

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
