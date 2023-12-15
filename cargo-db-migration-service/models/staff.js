'use strict';
const { Model, ForeignKeyConstraintError } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Staff extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			Staff.belongsTo(models.Role, { foreignKey: 'roleId' });
		}
	}
	Staff.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			idCard: DataTypes.STRING,
			address: DataTypes.STRING,
			status: DataTypes.STRING,
			mobile: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Staff'
		}
	);
	return Staff;
};
