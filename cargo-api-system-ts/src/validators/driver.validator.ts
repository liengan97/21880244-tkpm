const { body } = require("express-validator");

export const driverRegisterValidator = [
  body("name")
    .exists({ checkFalsy: false })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be string"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("email").optional().isEmail().withMessage("Provide valid email"),
  body("mobile")
    .optional()
    .isString()
    .withMessage("phone number should be string")
    .custom((value: any) => {
      if (value.length !== 10) {
        return Promise.reject("Phone number should be 10 digits");
      } else {
        return true;
      }
    }),
    body("idCard")
    .exists({ checkFalsy: false })
    .withMessage("ID card is required")
    .isString()
    .withMessage("ID card should be string"),
    body("carNumber")
    .exists({ checkFalsy: false })
    .withMessage("Vehicle registration plate is required")
    .isString()
    .withMessage("Vehicle registration plate should be string"),
    body("seatNumber")
    .exists({ checkFalsy: false })
    .withMessage("Number of seats is required")
    .isString()
    .withMessage("Number of seats should be number (4, 7)"),
    body("carBrand")
    .exists({ checkFalsy: false })
    .withMessage("Car brand is required")
    .isString()
    .withMessage("Car brand should be string"),
    body("carModel")
    .exists({ checkFalsy: false })
    .withMessage("Car model is required")
    .isString()
    .withMessage("Car model should be string"),
];