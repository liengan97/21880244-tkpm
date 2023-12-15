import { refreshToken } from '@/controllers/authentication.controller';
import bcrypt from 'bcrypt';
import { error } from 'console';
import jwt from 'jsonwebtoken';

// TODO REPLACE WITH ENV VARS
const SALT_ROUND = 10;
const ACCESS_TOKEN_PRIVATE_KEY = "ACC";
const REFRESH_TOKEN_PRIVATE_KEY = "Dsda";

export const hashPassword = (password: string) => bcrypt.hashSync(password, SALT_ROUND)

export const comparePassword = (password: string, hashedPassword: string) => bcrypt.compareSync(password, hashedPassword)

export const verifyToken = (token: string, secretKey: string) => {
	let res;

	jwt.verify(token, secretKey, (error: any, data: any) => {
		console.log(error);
		if (error) return false;
		else res = data;
	})

	return res;
}

export const generateTokens = (email: string) => {
	const payload = {
		email
	};

	const accessToken = jwt.sign(
		payload,
		ACCESS_TOKEN_PRIVATE_KEY,
		{ expiresIn: "15m" }
	);

	const refreshToken = jwt.sign(
		payload,
		REFRESH_TOKEN_PRIVATE_KEY,
		{ expiresIn: "30d" }
	);

	return {
		accessToken,
		refreshToken
	};
};