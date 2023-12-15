'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				name: 'Global Administrator',
				description: 'Making permissions apply to user'
			},
			{
				name: 'Customer support',
				description: 'Supporting customer to booking a taxi'
			},
			{
				name: 'Driver Support',
				description: ' Identification and verify driver information.'
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Roles', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Roles', null, {});
	}
};
