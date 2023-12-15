import { Request, Response, NextFunction } from 'express';
import { register, findByEmail, updateLocation } from '../controllers/driver.controller';
import { driverRegisterValidator } from '../validators/driver.validator';
import { updateTrip, getTripsByDriverId } from '../controllers/trip.controller';


const express = require('express');
const router = express();

router.post("/register", driverRegisterValidator, register);
router.post("/findDriver", findByEmail);
router.post("/updateLocation", updateLocation);

router.post("/updateTrip", updateTrip);
router.get("/trips/:driverId", getTripsByDriverId);



module.exports = router;