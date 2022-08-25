const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

/*--------------------------------- ROUTERS ---------------------------------*/
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
/*---------------------------------------------------------------------------*/

/*------------------------------- TEST ROUTES -------------------------------*/
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

/*---------------------------------------------------------------------------*/

/*------------------------------ ACTUAL ROUTES ------------------------------*/




/*---------------------------------------------------------------------------*/


module.exports = router;
