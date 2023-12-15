'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				driverId: 1,
				lat: 10.78515,
				long: 106.626854
			},
			{
				driverId: 2,
				lat: 10.7942433,
				long: 106.6380289
			},
			{
				driverId: 6,
				lat: 10.769313,
				long: 106.649548
			},
			{
				driverId: 4,
				lat: 10.793834,
				long: 106.636487
			},
			{
				driverId: 5,
				lat: 10.788506,
				long: 106.644877
			},
			{
				driverId: 3,
				lat: 10.7942777,
				long: 106.629059
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Locations', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Locations', null, {});
	}
};
