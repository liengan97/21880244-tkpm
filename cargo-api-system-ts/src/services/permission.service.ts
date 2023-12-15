import PermissionDao from '../dao/permission.dao';
import Permission from '../models/permission.interface';

export const createPermission = async (permission: Permission) => {
	return await PermissionDao.save(permission);
};

export const removePermission = async (name: string) => {
	return await PermissionDao.remove(name);
};

export const updatePermission = async (name: string, newDescription: string, newStatus: string) => {
	return await PermissionDao.update(name, newDescription, newStatus);
};

export const getPermissionByName = async (name: string) => {
	return await PermissionDao.getByName(name);
}

export const getData = async () => {
	return await PermissionDao.findAll();
}

export default { createPermission, removePermission, updatePermission }