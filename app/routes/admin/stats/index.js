const router = require('express').Router();
const devicesUtils = require('../../../utilities/devices');
const profilesUtils = require('../../../utilities/profiles');

//TODO: Provide better architecture for stats tracking in v2

//NOTE: Device for operations on (1) device / item
router.get('/device/highestTimesRequested', (req, res) => {
  devicesUtils.retrieveHighestRequestedDevice()
    .then(device => {
      if(!device){
        return res.sendStatus(404)
      }else{
        return res.send(device);
      }
    });
});

//NOTE: Devices for operations on multiple devices / item
router.get('/devices/highestTimesRequested', (req, res) => {
  devicesUtils.retrieveHighestRequestedDevices()
    .then(devices => {
      if(!devices){
        return res.sendStatus(404)
      }else{
        return res.send(devices);
      }
    });
});

module.exports = router;

