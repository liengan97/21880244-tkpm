import RoleDao from '../dao/role.dao';
import Role, { RolePermission } from '../models/role.interface';
import { ResponseData, ResponseErrors, Error } from '../models/response.interface';


export const getPermissions = async (roleId: number) => {
	return await RoleDao.getPermissions(roleId);
};

export const checkExistPermission = async (roleId: number): Promise<Boolean> => {
	return await RoleDao.checkExistPermission(roleId);
};

export const createRolePermissions = async (rolePermissions: Array<RolePermission>) => {
	return await RoleDao.saveRolePermission(rolePermissions);
};

export const getRolePermission = async (rolePermission: RolePermission) => {
	return await RoleDao.getRolePermission(rolePermission);
};


export const removeRolePermissions = async (roleId: number) => {
	return await RoleDao.removeRolePermissions(roleId);
};

export const createRole = async (role: Role) => {
	return await RoleDao.save(role);
};

export const removeRole = async (name: string) => {
	return await RoleDao.remove(name);
};

export const updateRole = async (name: string, newDescription: string) => {
	return await RoleDao.update(name, newDescription);
};

export const getRoleByName = async (name: string) => {
	return await RoleDao.getByName(name);
}

export const getData = async () => {
	return await RoleDao.findAll();
}

export default { createRole, removeRole, updateRole }