const { body } = require("express-validator");

export const userRegisterValidator = [
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
    .withMessage("Phone number should be string")
    .custom((value: any) => {
      if (value.length !== 10) {
        return Promise.reject("Phone number should be 10 digits");
      } else {
        return true;
      }
    }),
];