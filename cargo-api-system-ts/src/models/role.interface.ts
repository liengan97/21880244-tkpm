export interface Role {
  id: number
  name: string,
  description: string,
  permissions?: Array<any>
}

export interface RolePermission {
  id: number,
  roleId: number,
  permissionId: number
}


export default Role;