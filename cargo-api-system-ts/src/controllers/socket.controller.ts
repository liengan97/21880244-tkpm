import { CargoEvent, CargoEventStatus, SocketEvent, CargoSocket } from "../utils/socket.util";
import { getCache } from '../services/inmemory.cache.service';
import { SimpleCache } from "@/dao/immemory.cache.dao";
import { Location, TripRequest } from '@/models/trip.interface'

import * as tripService from '../services/trip.service';
import * as driverService from '../services/driver.service';
import Driver from "@/models/driver.interface";

// const MAX_DISTANCE = 2;

const MAX_DISTANCE = 20000;

type DriverSocket = {
  driverId: string,
  socket: CargoSocket,
}

type ClientSocket = {
  userEmail: string,
  socket: CargoSocket,
}

enum Answer {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  NO = 'NO'
}

type RequestedTripRoom = {
  roomId: string,
  answer: Answer,
  expires: Date,
  trip: TripRequest,
}
type DriverCache = {
  userEmail: string,
  driver: Driver
}

type TripConfirmResponse = {
  answer: Answer,
  fromRoomId: string,
}

const activeRequestedTripRooms: SimpleCache<RequestedTripRoom> = getCache('ACTIVE_REQUESTED_TRIP_ROOMS');

const onlineDriverSocketService: SimpleCache<DriverSocket> = getCache('ONLINE_DRIVER_SOCKETS');

const latestDriverLocationService: SimpleCache<Location> = getCache('LATEST_LOCATION_BY_DRIVERS');

const onlineRequestorService: SimpleCache<ClientSocket> = getCache('ONLINE_REQUESTORS');

const onlineDriverInformationService: SimpleCache<DriverCache> = getCache('ONLINE_DRIVER_INFORMATION');

const riderGoLiveHandler = async function (this: CargoSocket, callback: Function) {
  const socket: CargoSocket = this;
  const { userEmail } = this;

  onlineRequestorService.add(userEmail, {
    userEmail,
    socket
  });
  console.log("===================>", onlineRequestorService);


  callback({
    status: CargoEventStatus.OK,
    message: `You are online now.`
  });
}

const driverGoLiveHandler = async function (this: CargoSocket, location: Location, callback: Function) {
  const socket: CargoSocket = this;
  const { userEmail } = this;

  const exist = onlineDriverInformationService.get(userEmail);
  if (!exist) {
    const driver = await driverService.findDriverByEmail(userEmail);
    onlineDriverInformationService.add(userEmail, { userEmail, driver })
  }

  onlineDriverSocketService.add(userEmail, {
    driverId: userEmail,
    socket
  });

  latestDriverLocationService.add(userEmail, location);

  callback({
    status: CargoEventStatus.OK,
    message: `You are online now.`
  });
}

const driverOfflineHandler = function (this: CargoSocket, callback: Function) {
  const socket: CargoSocket = this;
  const { userEmail } = socket;

  onlineDriverSocketService.remove(userEmail);
  latestDriverLocationService.remove(userEmail);

  console.log(`DRIVER (${userEmail}) IS OFFLINE NOW.`)

  callback({
    status: CargoEventStatus.OK,
    message: "You are offline now."
  });
}

const clientDisconnectHandler = function (this: CargoSocket) {
  const socket: CargoSocket = this;
  const { userEmail } = socket;

  onlineDriverSocketService.remove(userEmail);
  latestDriverLocationService.remove(userEmail);

  console.log(`User (${userEmail}) has been disconnected.`);
}

const driverLocationChangedHandler = function (this: CargoSocket, onTripRoom: string, location: Location, callback: Function) {
  const socket: CargoSocket = this;

  latestDriverLocationService.add(socket.userEmail, location);

  if (onTripRoom) {
    socket.broadcast.to(onTripRoom).emit('MY_CURRENT_LOCATION', location);
  }

  callback({
    status: CargoEventStatus.OK,
    message: location
  });
}

const findDriverHandler = async function (this: CargoSocket, tripRequest: TripRequest, callback: Function) {
  const socket: CargoSocket = this;

  console.log('New Trip Request from: ', socket.userEmail, ' with ', tripRequest);

  callback({
    status: CargoEventStatus.INPROGRESS,
    message: 'We have received your request and are processing it.'
  })

  const MAX_TIME_WAIT = 10;

  let counter = 0;
  const eligibleDrivers: DriverSocket[] = await new Promise(resolve => {
    const interval = setInterval(() => {
      counter++;
      const found = findEligibleDrivers(tripRequest);
      if (found.length || counter > MAX_TIME_WAIT) {
        resolve(found)
        clearInterval(interval);
      }

      console.log('No drivers found. Trying again ....', counter);
    }, 1000);
  });

  if (!eligibleDrivers.length) {
    console.log('No drivers found. Exit');
    socket.emit('NO_DRIVERS_FOUND', tripRequest);
    return;
  }

  console.log('Found ', eligibleDrivers.length, ' drivers');

  const scheduledRoom = sendTripRequestToEligibleDrivers(socket, eligibleDrivers, tripRequest);

  const isTimeover: boolean = await new Promise(resolve => {
    const interval = setInterval(() => {
      const tripRequest: RequestedTripRoom = activeRequestedTripRooms.get(scheduledRoom);
      if (!tripRequest) {
        console.log('Trip does not exist or already picked up');
        resolve(false);
        clearInterval(interval)
      } else {
        console.log(tripRequest);
        if (new Date().getTime() > tripRequest.expires.getTime()) {
          resolve(true);
          activeRequestedTripRooms.remove(scheduledRoom);
          clearInterval(interval);
        }
      }
    }, 1000);
  });

  if (isTimeover) {
    console.log('No drivers responsed the trip request')
    socket.emit('NO_DRIVERS_FOUND', tripRequest);
  }
}

const driverTripResponseHandler = async function (this: CargoSocket, tripConfirm: TripConfirmResponse) {
  const socket: CargoSocket = this;
  const { userEmail } = socket;

  const { answer, fromRoomId } = tripConfirm;
  const requestedRoom: RequestedTripRoom = activeRequestedTripRooms.get(fromRoomId);
  const { requestorId, email: requestorEmail, isStaff } = requestedRoom.trip;

  if (requestedRoom) {
    if (new Date().getTime() > requestedRoom.expires.getTime()) {
      activeRequestedTripRooms.remove(fromRoomId);
    }
    else if ([Answer.REJECTED, Answer.NO].includes(requestedRoom.answer) && answer == Answer.ACCEPTED) {
      const driver = await driverService.findDriverByEmail(userEmail);


      const tripEntry = {
        ...requestedRoom.trip,
        driverId: driver.id
      }

      const trip = await tripService.createTrip(tripEntry);

      const requestor = onlineRequestorService.get(requestorEmail);

      console.log("========>", requestor, "====> rqtemail", requestorEmail)
      if (requestor) { // isOnline
        const roomId = 'ON_GOING_TRIP' + userEmail + new Date().getTime();

        // driver join room first
        socket.join(roomId);

        // requestor join room
        requestor.socket.join(roomId);

        requestor.socket.emit(CargoEvent.FOUND_DRIVER, {
          status: CargoEventStatus.OK,
          message: {
            driver:
            {
              carNumber: driver.carNumber,
              seatNumber: driver.seatNumber,
              carBrand: driver.carBrand,
              carModel: driver.carModel,
              name: driver.name,
              email: driver.email,
              mobile: driver.mobile,
            },
            roomId,
            tripRequest: requestedRoom.trip
          }
        });

        // socket.emit('START_TRIP', roomId)
        socket.emit('START_TRIP', {
          roomId,
          trip,
          driver
        });

        // socket.to(roomId).emit('START_TRIP', {
        //   roomId,
        //   trip,
        //   driver
        // });

      }
      else {
        //update statusTrip FAILED
        tripService.updateTrip(trip.id, "FAILED");
      }

      activeRequestedTripRooms.remove(fromRoomId);
      socket.broadcast.to(fromRoomId).emit("ALREADY_PICKEP_UP", trip.id);
    }
  }
}

const findEligibleDrivers = (tripRequest: TripRequest) => {

  const eligibleDrivers: DriverSocket[] = onlineDriverSocketService.entries()
    .filter(([_, driverSocket]) => {
      const { driverId } = driverSocket;
      const driver = onlineDriverInformationService.get(driverId);
      const { pickupAt, seatNumber } = tripRequest;

      const latestLocation: Location = latestDriverLocationService.get(driverId);

      const driverAndRequestorDistance = tripService.getDistance(
        pickupAt.latitude,
        pickupAt.longitude,
        latestLocation.latitude,
        latestLocation.longitude
      );

      return (driverAndRequestorDistance < MAX_DISTANCE);
    })
    .map(([_, driverSocket]) => driverSocket);

  return eligibleDrivers;
}

const sendTripRequestToEligibleDrivers = (socket: CargoSocket, drivers: DriverSocket[], tripRequest: TripRequest) => {
  const roomIdPostFixFormat = tripRequest.isStaff ? `STAFF_${tripRequest.requestorId}` : tripRequest.requestorId;
  let roomId = `${CargoEvent.TRIP_REQUEST}_${roomIdPostFixFormat}_${new Date().getTime()}`;;

  drivers.forEach((driverSocket: DriverSocket) => {
    driverSocket.socket.join(roomId);
  });

  socket.broadcast.to(roomId)
    .emit(CargoEvent.TRIP_REQUEST_DRIVERS_CONFIRMATION, {
      roomId,
      tripRequest
    });

  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + 10)  // this value should be configurable (10)

  activeRequestedTripRooms.add(roomId, {
    roomId,
    answer: Answer.NO,
    expires,
    trip: tripRequest
  });

  return roomId;
}

/**
 * MAIN HANDLERS
 * @param socket 
 */
export default function handlers(socket: CargoSocket) {
  console.log("Connected user: ", socket.id, socket.userEmail);

  // Reservered events
  socket.on(SocketEvent.CLIENT_DISCONNECT_TO_SERVER, clientDisconnectHandler);

  // Driver events
  socket.on(CargoEvent.DRIVER_GO_LIVE, driverGoLiveHandler);
  socket.on(CargoEvent.DRIVER_GO_OFFLINE, driverOfflineHandler);
  socket.on(CargoEvent.DRIVER_LOCATION_CHANGE, driverLocationChangedHandler)

  // Client events
  socket.on(CargoEvent.FIND_DRIVER, findDriverHandler);
  socket.on('RIDER_GO_LIVE', riderGoLiveHandler);
  socket.on(CargoEvent.TRIP_REQUEST_DRIVERS_CONFIRMATION_RESPONSE, driverTripResponseHandler);
}
