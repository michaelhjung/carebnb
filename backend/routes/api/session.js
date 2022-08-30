const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*------------------------------- MIDDLEWARE -------------------------------*/
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .withMessage('Email or username is required')
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];
/*--------------------------------------------------------------------------*/

/*--------------------------------- ROUTES ---------------------------------*/
// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

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
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);



/*--------------------------------------------------------------------------*/




module.exports = router;
