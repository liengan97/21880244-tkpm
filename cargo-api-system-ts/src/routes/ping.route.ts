import { ping } from '../controllers/ping.controler';
import express from 'express';

export const router = express();

router.get("/", ping);

module.exports = router;