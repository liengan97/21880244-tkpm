import { io } from "socket.io-client";

const baseURL = 'https://d86f-2405-4802-803b-c0f0-fd7f-d780-97ef-260d.ngrok-free.app';

export const socket = io(baseURL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 15,
  extraHeaders: {
    "ngrok-skip-browser-warning": "cargo-admin"
  }
});