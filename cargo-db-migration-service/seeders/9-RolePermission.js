'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				roleId: 1,
				permissionId: 1
			},
			{
				roleId: 1,
				permissionId: 2
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('RolePermissions', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('RolePermissions', null, {});
	}
};
