import Permission from "../models/permission.interface";


const models = require('cargo-db-migration-service/models');

class PermissionDao {
	async save(permission: Permission) {
		return await models.Permission.create(permission);
	};

	async remove(name: string) {
		return await models.Permission.destroy({ where: { name } });
	};

	async update(name: string, description: string, status: string) {
		return await models.Permission.update(
			{ description, status },
			{
				where: { name }
			})
	};
	async getByName(name: string) {
		return await models.Permission.findOne({ where: { name } });
	};

	async findAll() {
		return await models.Permission.findAll();
	};
}

export default new PermissionDao();