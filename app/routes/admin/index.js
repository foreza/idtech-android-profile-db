const router = require('express').Router();
const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

const statistics = require('./stats');
router.use('/stats', statistics);


router.get('/', (req, res) => {
  res.sendfile('app/views/index.html')
});


module.exports = router;
