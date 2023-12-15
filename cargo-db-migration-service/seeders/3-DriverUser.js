'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				name: 'Driver Pending',
				password: '$2b$10$y6vhFpjgfGekiTXsYdQrh.YzI156922zugOJ3EuwJPgKR1Ozh8n5m',
				email: 'pendingdriver@gmail.com',
				idCard: '111122124',
				carNumber: '121.111',
				seatNumber: 4,
				carBrand: 'HYNHDAI',
				carModel: 'H2023',
				status: 'ACTIVE',
				driverStatus: 'READY',
				mobile: '01111111111',
				address: '12 Co Giang, Quan 1, TPHCM'
			},
			{
				name: 'Driver 2',
				password: '$2b$10$y6vhFpjgfGekiTXsYdQrh.YzI156922zugOJ3EuwJPgKR1Ozh8n5m',
				email: 'driver2@gmail.com',
				idCard: '2222122124',
				carNumber: '121.222',
				seatNumber: 4,
				carBrand: 'MECIDESS',
				carModel: 'Y 2023',
				status: 'ACTIVE',
				driverStatus: 'READY',
				mobile: '0222222222',
				address: '34 CMT8, Quan 10, TPHCM'
			},
			{
				name: 'Driver Disabled',
				password: '$2b$10$y6vhFpjgfGekiTXsYdQrh.YzI156922zugOJ3EuwJPgKR1Ozh8n5m',
				email: 'disableddriver@gmail.com',
				idCard: '3312188854',
				carNumber: '121.333',
				seatNumber: 7,
				carBrand: 'Toyota',
				carModel: 'D 2023',
				status: 'DISABLED',
				driverStatus: 'READY',
				mobile: '03333333333',
				address: '227 Nguyen Van Cu, Phuong 5, Quan 5, TP HCM'
			},
			{
				name: 'Driver 4',
				password: '$2b$10$y6vhFpjgfGekiTXsYdQrh.YzI156922zugOJ3EuwJPgKR1Ozh8n5m',
				email: 'driver4@gmail.com',
				idCard: '4412122124',
				carNumber: '121.444',
				seatNumber: 7,
				carBrand: 'Toyota',
				carModel: 'Y 2023',
				status: 'ACTIVE',
				driverStatus: 'READY',
				mobile: '0444444444',
				address: '777 Luy Ban Bich, Tan Phu, TPHCM'
			},
			{
				name: 'Driver 5',
				password: '$2b$10$y6vhFpjgfGekiTXsYdQrh.YzI156922zugOJ3EuwJPgKR1Ozh8n5m',
				email: 'driver@gmail.com',
				idCard: '5512122124',
				carNumber: '121.555',
				seatNumber: 4,
				carBrand: 'Toyota',
				carModel: 'K 2022',
				status: 'ACTIVE',
				driverStatus: 'READY',
				mobile: '0555555555',
				address: '8 Nguyen Thi Minh Khai, Quan Binh Thanh, TP HCM'
			},
			{
				name: 'Driver 6',
				password: '$2b$10$y6vhFpjgfGekiTXsYdQrh.YzI156922zugOJ3EuwJPgKR1Ozh8n5m',
				email: 'ngan@gmail.com',
				idCard: '66112251255',
				carNumber: '121.666',
				seatNumber: 7,
				carBrand: 'KIA',
				carModel: 'Morning 2019',
				status: 'ACTIVE',
				driverStatus: 'READY',
				mobile: '06666666666',
				address: '6 Dinh Bo Linh, Binh Thanh, HCM'
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Drivers', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Drivers', null, {});
	}
};
