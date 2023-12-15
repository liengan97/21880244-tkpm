import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { ResponseErrors, Error } from '../models/response.interface';
import Permission from '../models/permission.interface';


const permissionService = require('../services/permission.service');

export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, description, status = "IN_USE" } = req.body;

		let exist: Permission = await permissionService.getPermissionByName(name);
		if (exist) {
			return res.status(409).json(Error("CONFLICT", "This name already in use"));
		}

		const permission: Permission = await permissionService.createPermission({ name, description, status });

		if (!permission) {
			return res.status(500).send('Internal Server Error');
		} else {
			res.status(201).json(permission);
		}

	} catch (error) {
		next(error);
	}
}

export const removePermission = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { name } = req.body;
		let exist = await permissionService.getPermissionByName(name);

		if (!exist) {
			return res.status(404).json(Error("NOT FOUND", "This permission is not exist!"));
		}
		else {
			await permissionService.removePermission(name);
			res.status(200).send('Deleted this permission');
		}

	} catch (error) {
		next(error);
	}
}

export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { name, description, status } = req.body;
		console.log(name, description, status);
		
		let exist = await permissionService.getPermissionByName(name);

		if (!exist) {
			return res.status(404).json(Error("NOT FOUND", "This permission is not exist!"));
		}

		let permission = await permissionService.updatePermission(name, description, status);

		if (!permission) {
			res.status(500).send('Internal Server Error');
		} else {
			res.status(200).json(permission);
		}
	} catch (error) {
		next(error);
	}
}
export const getPermissionByName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { name } = req.params;

		let p = await permissionService.getPermissionByName(name);

		if (!p) {
			return res.status(404).json(Error("NOT FOUND", "This permission is not exist!"));
		}
		else {
			res.status(200).json(p);
		}
	} catch (error) {
		next(error);
	}
}

export const showPermissions = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let permission: Array<Permission> = await permissionService.getData();

		if (!permission) {
			res.status(500).send('Internal Server Error');
		} else {
			res.status(200).json(permission);
		}
	} catch (error) {
		next(error);
	}
}
