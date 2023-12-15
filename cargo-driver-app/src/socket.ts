import { API_BASE_URL } from "@env";
import { io } from "socket.io-client";

const socket = io(API_BASE_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 15,
  extraHeaders: {
    "ngrok-skip-browser-warning": "driver-app"
  }
});

export default socket;