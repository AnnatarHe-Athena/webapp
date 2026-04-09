export const RoleAdmin = 150
export const RoleMedium = 120
export const RolePaid = 100
export const RoleNormal = 80

export function getPermissionObj(user: { role: number } | null) {
  if (!user) return { view: false, create: false, remove: false, admin: false, paid: false }
  return {
    view: true,
    create: user.role >= RoleNormal,
    remove: user.role >= RolePaid,
    admin: user.role >= RoleAdmin,
    paid: user.role >= RolePaid,
  }
}
