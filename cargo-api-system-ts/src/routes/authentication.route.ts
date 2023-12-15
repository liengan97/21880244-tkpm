import express from 'express';
import { login, logout, refreshToken } from '../controllers/authentication.controller';

export const router = express();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

module.exports = router;