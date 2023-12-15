'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				name: 'testcalling1',
				seatNumber: 3,
				mobile: 'testcalling',
				pickAddress: 'testcalling',
				desAddress: 'testcalling',
				pickLat: 1,
				pickLong: 1,
				desLat: 1.1,
				desLong: 1.2,
				pickTime: null,
				staffId: 1
			},
			{
				name: 'testcalling 2',
				seatNumber: 3,
				mobile: 'testcalling2',
				pickAddress: 'testcalling2',
				desAddress: 'testcalling2',
				pickLat: 1,
				pickLong: 1,
				desLat: 1.1,
				desLong: 1.2,
				staffId: 2,
				pickTime: null
			},
			{
				name: 'testcalling 3',
				seatNumber: 3,
				mobile: 'testcalling3',
				pickAddress: 'testcalling3',
				desAddress: 'testcalling3',
				pickLat: 1,
				pickLong: 1,
				desLat: 1.1,
				desLong: 1.2,
				staffId: 2,
				pickTime: null
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('CallingInformations', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('CallingInformations', null, {});
	}
};
