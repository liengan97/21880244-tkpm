const jwt = require('jsonwebtoken');
import { LoginRequest } from '../models/login.interface';

const authenticationDao = require('../dao/authentication.dao');

export const authUser = (loginRequest: LoginRequest) => {
    const { email, password } = loginRequest;

    return authenticationDao.findUser(email, password);
} 
export const authDriver = (loginRequest: LoginRequest) => {
    const { email, password } = loginRequest;

    return authenticationDao.findDriver(email, password);
} 
