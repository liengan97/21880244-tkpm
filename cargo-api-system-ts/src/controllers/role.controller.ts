import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { ResponseErrors, Error } from '../models/response.interface';
import { Role, RolePermission } from '../models/role.interface';
import { Permission } from '../models/permission.interface';


const roleService = require('../services/role.service');

//Get PermisstionData
export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { roleId } = req.body;
		let pers: Permission = await roleService.getPermissions(roleId);

		if (!pers) {
			return res.status(500).send('Internal Server Error');
		} else {
			res.status(201).json(pers);
		}
	} catch (error) {
		next(error);
	}
}

//RolePermission


export const removeRolePermission = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let exist: RolePermission = await roleService.getRolePermission(req.body);

		if (!exist) {
			return res.status(404).json(Error("CONFLICT", "This permission is not exist"));
		}

		const del: RolePermission = await roleService.removeRolePermission(exist);

		if (!del) {
			return res.status(500).send('Internal Server Error');
		} else {
			res.status(200).send('Deleted this permission');
		}
	} catch (error) {
		next(error);
	}
}

//Role
export const getRoleByName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.params;

		console.log(name);

		let exist = await roleService.getRoleByName(name);

		if (!exist) {
			return res.status(404).json(Error("NOT_FOUND", "This role is not found"));
		}
		else {
			let permissions = await roleService.getPermissions(exist.id);

			console.log(exist, permissions)

			exist.permissions = permissions;

			const tm = {
				...exist.dataValues,
				permissions: permissions.map((p: any) => {
					return p.dataValues
				})
			}

			res.status(200).json(
				tm
			);
		}

	} catch (error) {
		next(error);
	}
}


export const createRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, permissions } = req.body;

		let exist: Role = await roleService.getRoleByName(name);

		if (exist) {
			return res.status(409).json(Error("CONFLICT", "This name already in use"));
		}

		const role: Role = await roleService.createRole(req.body);

		if (permissions) {
			let rolePermissions: Array<RolePermission> = permissions.map((p: number) => {
				return {
					"roleId": role.id,
					"permissionId": p
				}
			})

			await roleService.createRolePermissions(rolePermissions);
		}

		if (!role) {
			return res.status(500).send('Internal Server Error');
		} else {
			res.status(201).json(role);
		}

	} catch (error) {
		next(error);
	}
}

export const removeRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { name } = req.body;
		let exist = await roleService.getRoleByName(name);

		if (!exist) {
			return res.status(404).json(Error("NOT FOUND", "This role is not exist!"));
		}
		else {
			await roleService.removeRole(name);
			res.status(200).send('Deleted this role');
		}

	} catch (error) {
		next(error);
	}
}


export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { id, name, description, permissions } = req.body;

		let exist = await roleService.getRoleByName(name);

		if (!exist) {
			return res.status(404).json(Error("NOT FOUND", "This role is not exist!"));
		}

		if (permissions) {
			let rolePermissions: Array<RolePermission> = permissions.map((p: number) => {
				return {
					"roleId": id,
					"permissionId": p
				}
			})

			await roleService.removeRolePermissions(id);
			await roleService.createRolePermissions(rolePermissions);
		}

		let role = await roleService.updateRole(name, description);

		if (!role) {
			res.status(500).send('Internal Server Error');
		} else {
			res.status(200).json(role);
		}
	} catch (error) {
		next(error);
	}
}

export const showRoles = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let roles: Array<Role> = await roleService.getData();
		if (!roles) {
			res.status(500).send('Internal Server Error');
		} else {

			const mappedRoles = await Promise.all(roles.map(async (role: any) => {
				return {
					...role.dataValues,
					permissionSet: await roleService.checkExistPermission(role.id)
				};
			}))

			res.status(200).json(mappedRoles);
		}
	} catch (error) {
		next(error);
	}
}
