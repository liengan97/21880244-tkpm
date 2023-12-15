'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CallingInformation extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			CallingInformation.belongsTo(models.Staff, { foreignKey: 'staffId' });
		}
	}
	CallingInformation.init(
		{
			name: DataTypes.STRING,
			seatNumber: DataTypes.INTEGER,
			mobile: DataTypes.STRING,
			pickTime: DataTypes.DATE,
			pickAddress: DataTypes.STRING,
			pickLat: DataTypes.DECIMAL,
			pickLong: DataTypes.DECIMAL,
			desAddress: DataTypes.STRING,
			desLat: DataTypes.DECIMAL,
			desLong: DataTypes.DECIMAL
		},
		{
			sequelize,
			modelName: 'CallingInformation'
		}
	);
	return CallingInformation;
};
