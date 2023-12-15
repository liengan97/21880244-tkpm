import { Op } from "sequelize";
import { Role, RolePermission } from "../models/role.interface";


const models = require('cargo-db-migration-service/models');

class RoleDao {

	async getPermissions(roleId: number) {
		const permissions: Array<RolePermission> = await models.RolePermission.findAll({ where: { roleId } })
		let permissionIds: any = [];
		permissions.forEach(p => permissionIds.push(p.permissionId));
		return await models.Permission.findAll(
			{
				where: {
					id: { [Op.in]: permissionIds }
				}
			});
	};

	async checkExistPermission(roleId: number): Promise<Boolean> {
		const permissions: RolePermission = await models.RolePermission.findOne({ where: { roleId } })
		if (permissions) {
			return true;
		}
		return false;
	};

	async saveRolePermission(r: Array<RolePermission>) {
		return await models.RolePermission.bulkCreate(r);
	};

	async getRolePermission(rolePermission: RolePermission) {
		return await models.RolePermission.findOne({
			where: {
				roleId: rolePermission.roleId,
				permissionId: rolePermission.permissionId
			}
		});
	};

	async removeRolePermissions(roleId: number) {
		return await models.RolePermission.destroy({ where: { roleId } });
	};

	async save(role: Role) {
		return await models.Role.create(role);
	};

	async remove(name: string) {
		return await models.Role.destroy({ where: { name } });
	};

	async update(name: string, description: string) {
		return await models.Role.update(
			{ description },
			{
				where: { name }
			})
	};
	async getByName(name: string) {
		return await models.Role.findOne({ where: { name } });
	};

	async findAll() {
		return await models.Role.findAll();
	};
}

export default new RoleDao();