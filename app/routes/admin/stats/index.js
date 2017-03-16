const router = require('express').Router();
const devicesUtils = require('../../../utilities/devices');
const profilesUtils = require('../../../utilities/profiles');

//TODO: Provide better architecture for stats tracking in v2

//NOTE: Device for operations on (1) device / item
/**
 * @api {GET} /admin/stats/device/highestTimesRequested GET /admin/stats/device/highestTimesRequested
 * @apiDescription Gets the most requested device in the database.
 * @apiName GetStatsDevice
 * @apiGroup Admin
 *
 * @apiExample {js} Request-Example:
 * 		/admin/stats/device/highestTimesRequested
 *
 * @apiSuccess {Object} device The most requested device.
 *
 * @apiSuccessExample {JSON} Success-Response-Example:
 *  {
 *    "_id": "58ae85af77f59a0e7559592b",
 *    "manufacture": "unknown",
 *    "model": "Android SDK built for x86",
 *    "__v": 0,
 *    "meta": {
 *      "times_requested": 3,
 *      "created_at": "2017-02-23T06:48:15.146Z"
 *    },
 *    "profiles": [
 *      "58ae85af77f59a0e7559592a"
 *    ]
 *  }
 *
 * @apiError (Not Found 404) {String} Error A device was not found.
 */
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
/**
 * @api {GET} /admin/stats/devices/highestTimesRequested GET /admin/stats/devices/highestTimesRequested
 * @apiDescription Gets the 5 most requested device in the database.
 * @apiName GetStatsDevices
 * @apiGroup Admin
 *
 * @apiExample {js} Request-Example:
 * 		/admin/stats/devices/highestTimesRequested
 *
 * @apiSuccess {Object[]} devices The 5 most requested device.
 *
 * @apiSuccessExample {JSON} Success-Response-Example:
 *    [
 *      {
 *        "_id": "58ae85af77f59a0e7559592b",
 *        "manufacture": "unknown",
 *        "model": "Android SDK built for x86",
 *        "__v": 0,
 *        "meta": {
 *          "times_requested": 3,
 *          "created_at": "2017-02-23T06:48:15.146Z"
 *        },
 *        "profiles": [
 *          "58ae85af77f59a0e7559592a"
 *        ]
 *      },
 *      {
 *        "_id": "58abcff7c3366a608bec3a1c",
 *        "manufacture": "Asus",
 *        "model": "ZenFone",
 *        "__v": 0,
 *        "meta": {
 *          "times_requested": 0,
 *          "created_at": "2017-02-21T05:28:23.998Z"
 *        },
 *        "profiles": [
 *          "58abcff7c3366a608bec3a1b"
 *        ]
 *      },
 *      {
 *        "_id": "58abd01fc3366a608bec3a1e",
 *        "manufacture": "HP",
 *        "model": "X3",
 *        "__v": 0,
 *        "meta": {
 *          "times_requested": 0,
 *          "created_at": "2017-02-21T05:29:03.367Z"
 *        },
 *        "profiles": [
 *          "58abd01fc3366a608bec3a1d"
 *        ]
 *      },
 *      {
 *        "_id": "58abd02cc3366a608bec3a20",
 *        "manufacture": "Samsung",
 *        "model": "Nexus",
 *        "__v": 0,
 *        "meta": {
 *          "times_requested": 0,
 *          "created_at": "2017-02-21T05:29:16.610Z"
 *        },
 *        "profiles": [
 *          "58abd02cc3366a608bec3a1f"
 *        ]
 *      },
 *      {
 *        "_id": "58abd03bc3366a608bec3a22",
 *        "manufacture": "Samsung",
 *        "model": "SII",
 *        "__v": 0,
 *        "meta": {
 *          "times_requested": 0,
 *          "created_at": "2017-02-21T05:29:31.834Z"
 *        },
 *        "profiles": [
 *          "58abd03bc3366a608bec3a21"
 *        ]
 *      }
 *    ]
 *
 * @apiError (Not Found 404) {String} Error The devices were not found.
 */
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
