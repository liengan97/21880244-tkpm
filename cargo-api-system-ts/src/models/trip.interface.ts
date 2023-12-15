export interface Trip {
  id: number | null,
  userId: number | null,
  driverId: number | null,
  staffId: number | null,
  status: string,
  paymentMethod: string,
  price: number,
  seatNumber: number,
  userName: string,
  mobile: string,
  pickTime: string,
  pickLat: number,
  pickLong: number,
  desLat: number,
  desLong: number,
  notesForDriver: string
}

export interface TripRequestV2 {
  userId: number,
  fullName: string,
  pickupAt: Location,
  dropOffAt: Location,
  seatNumber: number,
  notesForDriver: string,
  phoneNumber: string,
  paymentMethod: string,
  timePickup: string,
  staffId: number,
  staffOrUserId: number,
  isStaff: boolean,
  driverId: number
}

export interface TripRequest {
  requestorId: number,
  isStaff: boolean,
  email: string
  fullName: string,
  pickupAt: Location,
  dropOffAt: Location,
  seatNumber: number,
  notesForDriver: string,
  phoneNumber: string,
  paymentMethod: string, 
  timePickup: string,
  driverId: number,
  price: number,
}

export interface Location {
  latitude: number,
  longitude: number,
}

export interface OnlineDriver {
  driverId: string,
  userName: string,
}

export interface DriverLatestLocation {
  driverId: string,
  latitude: number,
  longtitude: number,
}






