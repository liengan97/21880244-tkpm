'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const items = [
			{
				name: 'Nguyen A',
				email: 'pendingstaff@gmail.com',
				password: '$2b$10$ZmcNVHq.oejb.oUYpsFzbOjVec2t7/zc6P6tqJyJWY1kta9sBft6y',
				idCard: 7,
				address: 'PO Box 91350',
				status: 'PENDING',
				mobile: '834-49-9856',
				roleId: 2
			},
			{
				name: 'Nguyen B',
				password: '$2b$10$ZmcNVHq.oejb.oUYpsFzbOjVec2t7/zc6P6tqJyJWY1kta9sBft6y',
				email: 'disabledstaff@gmail.com',
				idCard: 75,
				address: 'Suite 78',
				status: 'DISABLED',
				mobile: '884-68-7611',
				roleId: 2
			},
			{
				name: 'Staff',
				password: '$2b$10$ZmcNVHq.oejb.oUYpsFzbOjVec2t7/zc6P6tqJyJWY1kta9sBft6y',
				email: 'staff@gmail.com',
				idCard: 75,
				address: '227 NVC, Q5',
				status: 'ACTIVE',
				mobile: '884-68-7611',
				roleId: 1
			}
		];
		items.forEach((item) => {
			item.createdAt = Sequelize.literal('NOW()');
			item.updatedAt = Sequelize.literal('NOW()');
		});
		await queryInterface.bulkInsert('Staffs', items, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Staffs', null, {});
	}
};
