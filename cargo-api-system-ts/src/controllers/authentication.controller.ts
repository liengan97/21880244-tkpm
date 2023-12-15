import { NextFunction, Request, Response } from 'express';
import { generateToken, removeRefreshToken } from '../services/token.service';
import { findUserByEmail } from '../services/user.service';
import { findDriverByEmail } from '../services/driver.service';
import { findStaffByEmail } from '../services/staff.service';
import { comparePassword, verifyToken } from '../utils/auth.util';
import { ResponseData, Error } from '../models/response.interface';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, userType } = req.body;
    let user;
    
    console.log("ok ok");


    switch (userType) {
        case "user":
            user = await findUserByEmail(email);
            break;
        case "driver":
            user = await findDriverByEmail(email);
            break;
        case "staff":
            user = await findStaffByEmail(email);
        default:
            console.log(userType);
            break;
    }


    if (user && user?.status == 'DISABLED' && comparePassword(password, user.password)) {

        res.status(200).send(Error("DISABLED_ACCOUNT", 'YOUR ACCOUNT HAS BEEN DISABLED!'));
        return;
    }

    if (user && user?.status == 'PENDING' && comparePassword(password, user.password)) {

        res.status(200).send(Error("PENDING_ACCOUNT", 'YOUR ACCOUNT HAS NOT BEEN VERIFIED'));
        return;
    }

    if (user && user.status == 'ACTIVE' && comparePassword(password, user.password)) {

        console.log(user);
        res.json(ResponseData(await generateToken(email)));
        return;
    }

    res.status(400).json(Error("INVALID_CREDENTIALS", "Your username or password was invalid."));
};


export const logout = async (req: Request, res: Response) => {
    await removeRefreshToken(req.body.email);
    res.status(200).send();
}

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    // decoded email from token
    const data: any = verifyToken(refreshToken, "Dsda");

    if (data === false) {
        res.status(403).send("UNAUTHORIZED");
    }
    else {
        if (data?.email) {
            await removeRefreshToken(data?.email);
            console.log(refreshToken)
            res.json(ResponseData(await generateToken(data.email)));
        }
        else {
            res.status(403).send("INVALID_TOKEN");
        }
    }
}



