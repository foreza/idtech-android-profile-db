const router = require('express').Router();

const devices = require('./devices');
const profiles = require('./profiles');


router.use('/devices', devices);
router.use('/profiles', profiles)

module.exports = router;
