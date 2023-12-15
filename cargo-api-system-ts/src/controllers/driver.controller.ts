import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { ResponseErrors, Error } from '../models/response.interface';
// import Trip from '../models/trip.interface';


// import Resp from '../models/response.interface';

const driverService = require('../services/driver.service');
const tripService = require('../services/trip.service');

export const showDriver = async (req: Request, res: Response, next: NextFunction) => {
	try {

		const drivers = await driverService.findAll();
		console.log(drivers);

		if (!drivers) {
			res.status(404).send('Driver is not exist!');
		} else {
			res.status(200).json(drivers);
		}

	} catch (error) {
		next(error);
	}
};

export const updateLocation = async (req: Request, res: Response, next: NextFunction) => {
	try {

		let { driverId, lat, long } = req.body;

		let location = await driverService.updateLocation(driverId, lat, long);

		if (!location) {
			res.status(404).send('Driver is not exist!');
		} else {
			res.status(200).json(location);
		}

	} catch (error) {
		next(error);
	}
};

export const updateDriver = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, email, name, address, idCard, mobile, status, carBrand, carNumber, carModel, seatNumber, isActive } = req.body;
		const exist = await driverService.findDriverByEmail(email);
		if (!exist) {
			res.status(404).send('Driver is not exist!');
		} else {

			let driver = {
				'carNumber': carNumber,
				'seatNumber': seatNumber,
				'carBrand': carBrand,
				'carModel': carModel,
				'isActive': isActive,
				'id': id,
				'email': email,
				'name': name,
				'address': address,
				'idCard': idCard,
				'mobile': mobile,
				'status': status
			};
			await driverService.updateDriver(driver);

			res.status(200).json(driver);
		}

	} catch (error) {
		next(error);
	}
};


export const cancelTrip = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//TODO change status trip
		let { tripId } = req.body;
		const trip = await tripService.getTripById(tripId); //TODO
		if (trip.status == "ongoing") {
			tripService.updateTrip(trip);
		}

		if (trip.userId) {
			//TODO Message to  AppUser mobile
		}
		else {
			//TODO Message to  WEBAPP Supporter
		}
	} catch (error) {
		next(error);
	}
}

export const findByEmail = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = req.body;
		console.log(email);

		const driver = await driverService.findDriverByEmail(email);
		driver.password = null;

		if (!driver) {
			res.status(500).send('Not exist!');
		} else {
			res.status(201).json(driver);
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

		const exist = await driverService.findDriverByEmail(req.body.email);

		if (exist) {
			return res.status(409).json(Error("CONFLICT", "Email already exists!"));
		}

		const driver = await driverService.createDriver(req.body);

		if (!driver) {
			res.status(500).send('Internal Server Error');
		} else {
			res.status(201).json(driver);
		}

	} catch (error) {
		next(error);
	}
};

