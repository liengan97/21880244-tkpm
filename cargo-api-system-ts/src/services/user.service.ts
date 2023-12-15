import UserDao from '../dao/user.dao';
import User from '../models/user.interface';
import { hashPassword } from '../utils/auth.util';

export const createUser = async (user: User) => {
	user.password = hashPassword(user.password);
	user.status = "ACTIVE"
	return await UserDao.save(user);
};

export const findUserByEmail = async (email: string): Promise<User> => {
	return await UserDao.findByEmail(email);
}

export default { createUser, findUserByEmail }