'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('dm');
});

app.listen(port, () => {
	console.log(`server is running on port ${port} `);
});

app.get('/createTables', (req, res) => {
	let models = require('./models');

	models.sequelize.sync().then(() => {
		models.sequelize.query(
			`ALTER TABLE "RolePermissions" ADD CONSTRAINT "rolepermissions_un" UNIQUE ("roleId", "permissionId")`
		);

		res.send('tables created!');
	});
});
