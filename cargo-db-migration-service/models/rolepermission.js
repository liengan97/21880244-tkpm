'use strict';


const { Model, ForeignKeyConstraintError } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RolePermission extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			
			RolePermission.belongsTo(models.Role, { foreignKey: 'roleId' });
			RolePermission.belongsTo(models.Permission, { foreignKey: 'permissionId' });
			// RolePermission.hasHook('afterCreate', sequelize.query(`ALTER TABLE RolePermissions ADD CONSTRAINT rolepermissions_un UNIQUE ("roleId","permissionId")`));
		}
	}
	RolePermission.init(
		{
		
		},
		{
			sequelize,
			modelName: 'RolePermission'
		}
	);
	return RolePermission;
};
