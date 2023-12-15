import { register, findByEmail, showStaff, updateStaff, } from '../controllers/staff.controller';
import { staffRegisterValidator } from '../validators/staff.validator';
import { } from "./authentication.route"
import { bookingTrip,  getTripsByStaffId } from '../controllers/trip.controller';

const express = require('express');
const router = express();


router.post("/register", staffRegisterValidator, register);
router.post("/createTrip", bookingTrip);
router.post("/update", updateStaff);

router.get("/trips/:staffId", getTripsByStaffId);

router.get("/:email", findByEmail);
router.get("/", showStaff);

module.exports = router;