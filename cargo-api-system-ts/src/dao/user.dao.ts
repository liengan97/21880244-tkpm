import User from "../models/user.interface";


const models = require('cargo-db-migration-service/models');

class UserDao {
	async save(user: User) {
		return await models.User.create(user);
	};
	async findByEmail(email: string) {
		return await models.User.findOne({where: {email} });
	};
}

export default new UserDao();