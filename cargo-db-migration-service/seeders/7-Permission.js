'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				name: 'ui.triprequests:access',
				description: 'Access Trip Requests page',
				status: 'IN_USE'
			},
			{
				name: 'ui.triprequests.filters:search',
				description: 'Search Trip',
				status: 'IN_USE'
			},
			{
				name: 'ui.triprequests.create-trip-btn:click',
				description: 'Create a trip',
				status: 'IN_USE'
			},
			{
				name: 'ui.triprequests.btn-view-detail:click',
				description: 'View trip details',
				status: 'IN_USE'
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Permissions', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Permissions', null, {});
	}
};
