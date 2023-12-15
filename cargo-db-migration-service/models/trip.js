'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Trip extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			Trip.belongsTo(models.User, { foreignKey: 'userId' });
			Trip.belongsTo(models.Driver, { foreignKey: 'driverId' });
			Trip.belongsTo(models.Staff, { foreignKey: 'staffId' });
		}
	}
	Trip.init(
		{
			paymentMethod: DataTypes.STRING,
			price: DataTypes.DECIMAL,
			seatNumber: DataTypes.INTEGER,
			userName: DataTypes.STRING,
			mobile: DataTypes.STRING,
			pickTime: DataTypes.STRING,
			pickLat: DataTypes.DECIMAL,
			pickLong: DataTypes.DECIMAL,
			desLat: DataTypes.DECIMAL,
			desLong: DataTypes.DECIMAL,
			status: DataTypes.STRING,
			notesForDriver: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Trip'
		}
	);
	return Trip;
};
