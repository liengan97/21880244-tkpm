import Staff from "../models/staff.interface";

// npm link cargo-db-migration-service
const models = require('cargo-db-migration-service/models');

class StaffDao {
	async save(staff: Staff) {
		return await models.Staff.create(staff);
	};

	async findById(staffId: number) {
		return await models.Staff.findByPk(staffId)
	}

	async update(staff: Staff) {
		return await models.Staff.update(
			{
				name: staff.name,
				address: staff.address,
				idCard: staff.idCard,
				mobile: staff.mobile,
				roleId: staff.roleId,
				status: staff.status,
			},
			{ where: { email: staff.email } }
		);
	};

	async findByEmail(email: string) {
		return await models.Staff.findOne({
			where: { email },
		});
	}

	async findAll() {
		return await models.Staff.findAll();
	};
}

export default new StaffDao();
