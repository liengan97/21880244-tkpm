import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { Trip } from '../models/trip.interface';
import staffService from '../services/staff.service';

const tripService = require('../services/trip.service');


export const getTripsByStaffId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { staffId } = req.params;

    const results = await tripService.findTripsByStaffId(staffId);

    if (!results) {
      res.status(502).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    next(error);
  }
}

export const getTripsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { userId } = req.params;

    const results = await tripService.findTripsByUserId(userId);

    if (!results) {
      res.status(502).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    next(error);
  }
}
export const getTripsByDriverId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { driverId } = req.params;

    const results = await tripService.findTripsByDriverId(driverId);

    if (!results) {
      res.status(502).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    next(error);
  }
}

//TODO
export const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let { tripId, status } = req.body
    const trip = await tripService.updateTrip(tripId, status);

    if (!trip) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(trip);
    }

  } catch (error) {
    next(error);
  }
};

export const bookingTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let { tripRequest, driverId } = req.body
    const trip = await tripService.createTrip(tripRequest, driverId);

    if (!trip) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send(trip);
    }

  } catch (error) {
    next(error);
  }
};

export const getTripByDriverId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, driverId, staffId, userType } = req.params;
    let trip;
    switch (userType) {
      case "staff":
        trip = tripService.getTripsByStaffId(staffId);
        break;
      case "user":
        trip = tripService.getTripsByUserfId(userId);
        break;
      case "driver":
        trip = tripService.getTripsByDriverfId(driverId);
        break;
    }
    if (!trip) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(trip);
    }

  } catch (error) {
    next(error);
  }
};


