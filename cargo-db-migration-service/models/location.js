'use strict';
const { Model, ForeignKeyConstraintError } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Location extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			Location.belongsTo(models.Driver, { foreignKey: 'driverId' });
		}
	}
	Location.init(
		{
			lat: DataTypes.DECIMAL,
			long: DataTypes.DECIMAL
		},
		{
			sequelize,
			modelName: 'Location'
		}
	);
	return Location;
};
