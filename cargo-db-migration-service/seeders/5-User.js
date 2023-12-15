'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				name: 'Kim Kim',
				password: '$2b$10$E7WK6YjYxfV9yKfdogMNXuYgBOW5lYJze3rm/w2.yCEEZ8hygDC8y',
				email: 'user@gmail.com',
				idCard: '21880244',
				isVIP: true,
				status: 'ACTIVE',
				mobile: '398-434-9168'
			},
			{
				name: 'User Disabled',
				password: '$2b$10$E7WK6YjYxfV9yKfdogMNXuYgBOW5lYJze3rm/w2.yCEEZ8hygDC8y',
				email: 'user1@gmail.com',
				idCard: '3586836788885096',
				isVIP: true,
				status: 'DISABLED',
				mobile: '398-434-9168'
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Users', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
