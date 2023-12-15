import DriverDao from '../dao/driver.dao';
import UserDao from '../dao/user.dao';
import StaffDao from '../dao/staff.dao';

import TripDao from '../dao/trip.dao';
import { Trip, TripRequest } from '../models/trip.interface';
import Driver from '@/models/driver.interface';
const userService = require("../services/user.service");
const staffService = require("../services/staff.service");


export const getDistance = (pickLat: number, pickLong: number, desLat: number, desLong: number) => {

	let diffLat = (pickLat - desLat) * Math.PI / 180; //degree to radian
	let diffLong = (pickLong - desLong) * Math.PI / 180; //degree to radian
	let latitude1 = pickLat * Math.PI / 180;
	let latitude2 = desLat * Math.PI / 180;
	let val = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.pow(Math.sin(diffLong / 2), 2);
	console.log(pickLat, pickLong, desLat, desLong, diffLong)
	return (6378.8 * (2 * Math.asin(Math.sqrt(val))));
}

export const createTrip = async (tripRequest: TripRequest) => {

	let { pickupAt, dropOffAt } = tripRequest;
	if (!tripRequest.isStaff) {
		const user = await userService.findUserByEmail(tripRequest.email);
		tripRequest.requestorId = user.id;
		tripRequest.fullName = user.name;
		tripRequest.phoneNumber = user.mobile;
	}
	else {
		const staff = await staffService.findStaffByEmail(tripRequest.email);
		tripRequest.requestorId = staff.id;
	}

	const trip: Trip = {
		id: null,
		driverId: tripRequest.driverId,
		seatNumber: tripRequest.seatNumber,
		staffId: tripRequest.isStaff ? tripRequest.requestorId : null,
		status: "SCHEDULED",
		paymentMethod: tripRequest.paymentMethod,
		pickTime: tripRequest.timePickup,
		userId: !tripRequest.isStaff ? tripRequest.requestorId : null,
		price: tripRequest.price,
		pickLat: pickupAt.latitude,
		pickLong: pickupAt.longitude,
		desLat: dropOffAt.latitude,
		desLong: dropOffAt.longitude,
		mobile: tripRequest.phoneNumber,
		userName: tripRequest.fullName,
		notesForDriver: tripRequest.notesForDriver
	}

	return await TripDao.save(trip);
};



export const updateTrip = async (tripId: number, status: string) => {
	return await TripDao.update(tripId, status);
};

export const findTripsByUserId = async (userEmail: string): Promise<Trip> => {
	const user = await UserDao.findByEmail(userEmail)
	const re = await TripDao.getTripsByUserId(user.id);

	let trip = re && re.length > 0 ? re[0] : {}

	return trip;
}
export const findTripsByDriverId = async (driverEmail: string): Promise<Trip> => {
	const driver = await DriverDao.findByEmail(driverEmail)
	const re = await TripDao.getTripsByDriverId(driver.id);

	let trip = re && re.length > 0 ? re[0] : {}

	return trip;
}

export const findTripsByStaffId = async (staffEmail: string) => {
	const staff = await StaffDao.findByEmail(staffEmail);
	console.log("===================",staff);
	const re = await TripDao.getTripsByStaffId(staff.id);

	let trip = re && re.length > 0 ? re[0] : {}

	return trip;

}

export const findAll = async () => {
	const re = await TripDao.findAll();

	let trip = re && re.length > 0 ? re[0] : {}

	return trip;

}


export default { createTrip, findTripsByUserId, findTripsByDriverId, findTripsByStaffId }