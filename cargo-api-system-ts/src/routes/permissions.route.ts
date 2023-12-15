import { createPermission, removePermission, updatePermission, showPermissions, getPermissionByName } from '../controllers/permission.controller';

const express = require('express');
const router = express();
router.get("/", showPermissions);
router.post("/new", createPermission);
router.post("/remove", removePermission);
router.post("/update", updatePermission);
router.get("/:name", getPermissionByName)

module.exports = router;