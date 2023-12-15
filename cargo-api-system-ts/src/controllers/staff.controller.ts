import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { ResponseErrors, Error } from '../models/response.interface';
import { findStaffByEmail } from '../services/staff.service';
import Staff from '../models/staff.interface';
// import Resp from '../models/response.interface';

const staffService = require('../services/staff.service');

export const showStaff = async (req: Request, res: Response, next: NextFunction) => {
	try {

		const staffs = await staffService.findAll();
		console.log(staffs);

		if (!staffs) {
			res.status(404).send('Staff is not exist!');
		} else {
			res.status(200).json(staffs);
		}

	} catch (error) {
		next(error);
	}
};

export const updateStaff = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, email, name, address, idCard, mobile, roleId, status } = req.body;
		const exist = await staffService.findStaffByEmail(email);
		if (!exist) {
			res.status(404).send('Staff is not exist!');
		} else {

			let staff = {
				'id': id,
				'email': email,
				'name': name,
				'address': address,
				'idCard': idCard,
				'mobile': mobile,
				'roleId': roleId,
				'status': status
			};
			await staffService.updateStaff(staff);

			res.status(200).json(staff);
		}

	} catch (error) {
		next(error);
	}
};

export const findByEmail = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = req.params;
		console.log(email);

		const staff = await staffService.findStaffByEmail(email);

		if (!staff) {
			res.status(500).send('Not exist!');
		} else {
			res.status(201).json(staff.dataValues);
		}

	} catch (error) {
		next(error);
	}
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	console.log(errors);
		// 	return res.status(400).json(ResponseErrors(errors.array()));
		// }

		const exist = await staffService.findStaffByEmail(req.body.email);

		if (exist) {
			return res.status(409).json(Error("CONFLICT", "E-mail already in use"));
		}

		const user = await staffService.createStaff(req.body);

		if (!user) {
			res.status(500).send('Internal Server Error');
		} else {
			res.status(200).json(user);
		}

	} catch (error) {
		next(error);
	}
};

