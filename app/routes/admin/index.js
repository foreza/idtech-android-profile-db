const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

router.get('/', (req, res) => {
  res.sendfile('app/views/index.html')
});

module.exports = router;
