import { Trip } from "../models/trip.interface";
const { QueryTypes } = require('sequelize');

// npm link cargo-db-migration-service
const models = require('cargo-db-migration-service/models');

class TripDao {
	async save(trip: Trip) {
		return await models.Trip.create(trip);
	};

	async update(id: number, status: string) {
		return models.Trip.update(
			{
				status
			},
			{
				where: { id }
			})
	};

	async getTripsByStaffId(staffId: number) {

		return await models.sequelize.query(
			`SELECT "t"."id", "t"."userName", "t"."seatNumber", "t"."mobile", "t"."pickTime" ,  "t"."pickLat", "t"."pickLong", "t"."desLat", "t"."desLong","t"."paymentMethod" ,  "t"."price", "t"."status", "t"."updatedAt" ,"d"."name" as "driverName" , "d"."mobile"  as "driverMobile", "d"."carNumber", "d"."carBrand" FROM  "Trips" AS "t"  INNER JOIN "Drivers" AS "d" ON "t"."driverId"="d"."id" WHERE "t"."staffId"= ${staffId}`);
	}

	async getTripsByUserId(userId: number) {

		return await models.sequelize.query(
			`SELECT "t"."id", "t"."userName", "t"."seatNumber", "t"."mobile", "t"."pickTime" ,  "t"."pickLat", "t"."pickLong", "t"."desLat", "t"."desLong","t"."paymentMethod" ,  "t"."price", "t"."status", "t"."updatedAt", "d"."name" as "driverName" , "d"."mobile"  as "driverMobile", "d"."carNumber", "d"."carBrand" FROM  "Trips" AS "t"  INNER JOIN "Drivers" AS "d" ON "t"."driverId"="d"."id" WHERE "t"."userId"= ${userId}`);
	}
	async getTripsByDriverId(driverId: number) {

		return await models.sequelize.query(
			`SELECT "t"."id", "t"."userName", "t"."seatNumber", "t"."mobile", "t"."pickTime" ,  "t"."pickLat", "t"."pickLong", "t"."desLat", "t"."desLong","t"."paymentMethod" ,  "t"."price", "t"."status", "t"."updatedAt", "d"."name" as "driverName" , "d"."mobile"  as "driverMobile", "d"."carNumber", "d"."carBrand" FROM  "Trips" AS "t"  INNER JOIN "Drivers" AS "d" ON "t"."driverId"="d"."id" WHERE "t"."driverId"= ${driverId}`);
	}

	async findAll() {
		return await models.sequelize.query(
			`SELECT "t"."id", "t"."userName", "t"."seatNumber", "t"."mobile", "t"."pickTime" ,  "t"."pickLat", "t"."pickLong", "t"."desLat", "t"."desLong","t"."paymentMethod" ,  "t"."price", "t"."status", "t"."updatedAt", "d"."name" as "driverName" , "d"."mobile"  as "driverMobile", "d"."carNumber", "d"."carBrand" FROM  "Trips" AS "t"  INNER JOIN "Drivers" AS "d" ON "t"."driverId"="d"."id"`);
	};

}

export default new TripDao();
