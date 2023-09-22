const {validationResult} = require('express-validator');
const {StatusCodes} = require("http-status-codes");
const User = require("../Models/User");
const {BadRequestError, NotFoundError} = require("../Errors");

// User sing up middleware
exports.signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new BadRequestError(result.array()[0].msg);
    }

    const user = new User({
        firstName,
        lastName,
        email,
        password
    });

    await user.save();
    user.password = undefined;

    res.status(StatusCodes.CREATED).json({user});
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(StatusCodes.OK).json({users})
}