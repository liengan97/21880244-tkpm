import { createRole, removeRole, updateRole, showRoles, removeRolePermission, getPermissions, getRoleByName } from '../controllers/role.controller';

const express = require('express');
const router = express();

router.get("/", showRoles);
router.post("/create", createRole);
router.post("/remove", removeRole);
router.post("/update", updateRole);
router.post("/removePermission", removeRolePermission);
router.post("/getPermissions", getPermissions);
router.get("/:name", getRoleByName);

module.exports = router;