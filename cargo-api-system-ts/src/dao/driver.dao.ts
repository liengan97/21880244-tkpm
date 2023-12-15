import Driver from "../models/driver.interface";

// npm link cargo-db-migration-service
const models = require('cargo-db-migration-service/models');

class DriverDao {

	async getLocationsData() {
		return await models.Location.findAll({
			attributes: [
				"id",
				"name",
				"email",
				"idCard",
				"mobile",
				"address",
				"carNumber",
				"seatNumber",
				"carBrand",
				"carModel",
				"driverStatus",
				"status"
			]
		}
		);
	}

	async getLocationById(driverId: number) {
		return await models.Location.findOne({ where: { driverId } });
	}

	async updateLocation(driverId: number, lat: number, long: number) {
		return await models.Location.update(
			{
				lat,
				long,
			},
			{ where: { driverId } }
		);
	}

	async createLocation(driverId: number, lat: number, long: number) {
		return await models.Location.create({ driverId, lat, long })
	}

	async update(driver: Driver) {
		return await models.Staff.update(
			{
				name: driver.name,
				address: driver.address,
				idCard: driver.idCard,
				mobile: driver.mobile,
				accountStatus: driver.status,
				carBrand: driver.carBrand,
				carNumber: driver.carNumber,
				carModel: driver.carModel,
				seatNumber: driver.seatNumber,
				isActive: driver.driverStatus
			},
			{ where: { email: driver.email } }
		);
	};

	async save(driver: Driver) {
		return await models.Driver.create(driver);
	};

	async getDriverById(driverId: number) {

		return await models.Driver.findOne(

			{
				attributes: [
					"name",
					"mobile",
					"carNumber"
				], where: { id: driverId }
			});
	}

	async findByEmail(email: string) {
		return await models.Driver.findOne({
			where: { email }
		}
		);
	}
}

export default new DriverDao();

