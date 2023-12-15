const express = require('express');
const router = require('./routes');
const http = require('http');

var cors = require('cors')
import { Request, Response, NextFunction } from 'express';
import handlers from './controllers/socket.controller';
import { Socket } from 'socket.io';
import { CargoSocket } from './utils/socket.util';

const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const port = 8888; // TODO  


const io = new Server(server, {
	cors: {
		origin: '*',
	}
});

app.use(express.json());
app.use(cors());

app.use('/', router);

io.use((socket: CargoSocket, next: NextFunction) => {
	const accessToken = socket.handshake.query?.accessToken;
	if (!accessToken) {
		return next(new Error('Unauthorized'));
	}

	jwt.verify(accessToken, "ACC", (error: any, decoded: any) => {
		if (error) {
			return next(new Error(error));
		}
		socket.userEmail = decoded.email;
		return next();
	})
})

io.on('connection', handlers)

app.use(function (error: Error, request: Request, response: Response, next: NextFunction) {
	console.log(error);
	response.status(500).send('Internal Server Error');
});

server.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
