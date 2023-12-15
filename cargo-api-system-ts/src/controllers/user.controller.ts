import {Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { ResponseErrors, Error } from '../models/response.interface';

const userService = require('../services/user.service');

export const findByEmail = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {email} = req.body;
		console.log(email);

		const user = await userService.findUserByEmail(email);
		user.password = null;
		console.log(user);

		if (!user) {
			res.status(500).send('Not exist!');
		} else {
			res.status(201).json(user);
		}

	} catch (error) {
		next(error);
	}
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(400).json(ResponseErrors(errors.array()));
		}
		
		const exist = await userService.findUserByEmail(req.body.email);

		if(exist) {
			return res.status(409).json(Error("CONFLICT", "E-mail already in use"));
		}

		const user = await userService.createUser(req.body);
		

		if (!user) {
			res.status(500).send('Internal Server Error');
		} else {
			res.status(201).json(user);
		}

	} catch (error) {
		next(error);
	}
};

