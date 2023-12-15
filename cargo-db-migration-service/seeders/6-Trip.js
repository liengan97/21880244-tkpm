'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				userId: 1,
				driverId: 1,
				staffId: null,
				status: 'COMPLETED',
				paymentMethod: 'COD',
				price: 28500,
				seatNumber: 4,
				userName: 'Kim Kim',
				mobile: '099994884',
				pickTime: new Date(),
				pickLat: 10.000125,
				pickLong: 106.22512,
				desLat: 10.01255,
				desLong: 106.66602,
				notesForDriver: null
			},
			{
				userId: null,
				driverId: 1,
				staffId: 2,
				status: 'COMPLETED',
				paymentMethod: 'COD',
				price: 85200,
				seatNumber: 4,
				userName: 'Kim Ngan',
				mobile: '099994884',
				pickTime: new Date(),
				pickLat: 12,
				pickLong: 12,
				desLat: 12,
				desLong: 12.02,
				notesForDriver: null
			},
			{
				userId: null,
				driverId: 3,
				staffId: 2,
				status: 'COMPLETED',
				paymentMethod: 'COD',
				price: 72000,
				seatNumber: 7,
				userName: 'Ngan',
				mobile: '09999488444',
				pickTime: new Date(),
				pickLat: 12.02125,
				pickLong: 10.02221,
				desLat: 12,
				desLong: 12.02,
				notesForDriver: null
			},
			{
				userId: 1,
				driverId: 1,
				staffId: null,
				status: 'COMPLETED',
				paymentMethod: 'COD',
				price: 30000,
				seatNumber: 4,
				userName: 'Kim Kim',
				mobile: '0333994884',
				pickTime: new Date(),
				pickLat: 10.12334,
				pickLong: 106.003833,
				desLat: 10.1246,
				desLong: 106.21255,
				notesForDriver: null
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Trips', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Trips', null, {});
	}
};
