import StaffDao from '../dao/staff.dao';
import Staff from '../models/staff.interface';

import { hashPassword } from '../utils/auth.util';

export const getStaffById = async (staffId: number): Promise<Staff> => {

	return await StaffDao.findById(staffId);
};

export const createStaff = async (staff: Staff): Promise<Staff> => {
	staff.password = hashPassword(staff.password);
	return await StaffDao.save(staff);
};

export const updateStaff = async (staff: Staff): Promise<Staff> => {
	return await StaffDao.update(staff);
};

export const findStaffByEmail = async (email: string): Promise<Staff> => {
	return await StaffDao.findByEmail(email);
}

export const findAll = async (): Promise<Array<Staff>> => {
	return await StaffDao.findAll();
}
export default { createStaff, getStaffById }