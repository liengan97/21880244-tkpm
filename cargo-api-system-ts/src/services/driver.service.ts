import { ARRAY } from 'sequelize';
import DriverDao from '../dao/driver.dao';
import Driver from '../models/driver.interface';

import { hashPassword } from '../utils/auth.util';

export const updateLocation = async (driverId: number, lat: number, long: number): Promise<Location> => {
	const driverLocation = await DriverDao.getLocationById(driverId);

	if (driverLocation) {
		console.log("======================> exist driver Id", driverLocation)
		return await DriverDao.updateLocation(driverId, lat, long);
	} else {
		return await DriverDao.createLocation(driverId, lat, long);
	}
};



export const getLocationsData = async () => {
	return await DriverDao.getLocationsData();
}

export const createDriver = async (driver: Driver): Promise<Driver> => {
	driver.password = hashPassword(driver.password);
	driver.status = "PENDING"
	return await DriverDao.save(driver);
};

export const updateDriver = async (driver: Driver): Promise<Driver> => {
	return await DriverDao.update(driver);
};

export const getDriverById = async (driverId: number): Promise<Driver> => {
	return await DriverDao.getDriverById(driverId);
};

export const findDriverByEmail = async (email: string): Promise<Driver> => {
	return await DriverDao.findByEmail(email);
}
export default { createDriver, findDriverByEmail }