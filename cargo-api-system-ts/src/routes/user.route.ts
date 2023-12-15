import { register, findByEmail } from '../controllers/user.controller';
import { userRegisterValidator } from '../validators/user.validator';
import { getTripsByUserId } from '../controllers/trip.controller';
const express = require('express');
const router = express();


router.post("/register", userRegisterValidator, register);

router.get("/findUser", findByEmail);
router.get("/trips/:userId", getTripsByUserId);

module.exports = router;