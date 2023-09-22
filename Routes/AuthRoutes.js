const express = require("express");
const {check, body} = require("express-validator");
const authController = require("../Controllers/Auth");
const User = require("../Models/User");

const router = express.Router();

// Create a New User
router.post(
    "/users",
    [
        check('email').isEmail().withMessage('Enter a valid Email')
            .normalizeEmail()
            .custom((value, {req}) => {
                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            throw new Error("Email exists already");
                        }
                    });
            }),
        body("firstName","first name is missing!").trim().notEmpty(),
        body("lastName","last name is missing!").trim().notEmpty(),
        body("email", "Enter a valid email").trim().isEmail(),
        body("password", "Enter a valid password, must be 8 characters long")
    ],
    authController.signup
);

// Fetch All Users
router.get("/users", );

// Fetch One User
router.get("/users");

router.put("/users/:id");
// Update a User

// Delete a User
router.delete("/users/:id");

module.exports = router;
