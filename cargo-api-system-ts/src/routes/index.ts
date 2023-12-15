const authenticationRoute = require('./authentication.route');
const userRoute = require('./user.route');
const driverRoute = require('./driver.route');
const staffRoute = require('./staffs.route');
const roleRoute = require('./roles.route');
const permissionRoute = require('./permissions.route');
const pingRoute = require('./ping.route');


// TODO: routes...

const express = require('express')
const router = express()

router.use("/roles", roleRoute);
router.use("/staffs", staffRoute);
router.use("/auth", authenticationRoute);
router.use("/users", userRoute);
router.use("/drivers", driverRoute);
router.use("/permissions", permissionRoute);
router.use("/ping", pingRoute);

// TODO: routes ...

module.exports = router;