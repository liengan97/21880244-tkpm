import { Socket } from "socket.io"

// Contract between client and server
export enum CargoEvent {
  DRIVER_GO_LIVE = 'DRIVER_GO_LIVE',
  DRIVER_GO_OFFLINE = 'DRIVER_GO_OFFLINE',
  DRIVER_LOCATION_CHANGE = 'DRIVER_LOCATION_CHANGE',
  FIND_DRIVER = 'FIND_DRIVER',
  TRIP_REQUEST = 'TRIP_REQUEST',
  TRIP_REQUEST_DRIVERS_CONFIRMATION = 'TRIP_REQUEST_DRIVERS_CONFIRMATION',
  TRIP_REQUEST_DRIVERS_CONFIRMATION_RESPONSE = 'TRIP_REQUEST_DRIVERS_CONFIRMATION_RESPONSE',
  IM_BACK = 'IM_BACK',
  FOUND_DRIVER = 'FOUND_DRIVER'
}

export enum CargoRoom {
  ONLINE_DRIVERS = 'ONLINE_DRIVERS'
}

export enum CargoEventStatus {
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
  OK = 'OK'
}

export enum SocketEvent {
  CLIENT_DISCONNECT_TO_SERVER = 'disconnect'
}

export interface CargoSocket extends Socket {
  userEmail: string
}