const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*------------------------------- MIDDLEWARE -------------------------------*/
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Invalid email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required')
        .isLength({ min: 2 })
        .withMessage('Please provide a first name with at least 2 characters.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required')
        .isLength({ min: 2 })
        .withMessage('Please provide a last name with at least 2 characters.'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Username is required')
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
/*--------------------------------------------------------------------------*/

/*--------------------------------- ROUTES ---------------------------------*/
// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { firstName, lastName, email, password, username } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        const existingUsername = await User.findOne({ where: { username } });

        if (existingEmail) {
            const err = new Error("User already exists");
            err.status = 403;
            err.errors = { "email": "User with that email already exists"}
            next(err);
        }
        else if (existingUsername) {
            const err = new Error("User already exists");
            err.status = 403;
            err.errors = { "username": "User with that username already exists"}
            next(err);
        }
        else {
            const user = await User.signup({ firstName, lastName, email, username, password });

            await setTokenCookie(res, user);

            const userData = {};
            userData.id = user.id;
            userData.firstName = user.firstName;
            userData.lastName = user.lastName;
            userData.email = user.email;
            userData.username = user.username;
            userData.token = "";

            return res.json({
                ...userData
            });
        }
    }
);



/*--------------------------------------------------------------------------*/




module.exports = router;
