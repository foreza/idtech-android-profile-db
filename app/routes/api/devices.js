const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

// TODO: Secure this route and disallow public usage of this route
/**
 * @api {GET} /api/devices GET /api/devices
 * @apiDescription Gets a device by manufacture and model if requested; otherwise, gets all devices in the database.
 * @apiName GetDevices
 * @apiGroup Devices
 *
 * @apiParam {String} [manufacture] Optional device manufacture.
 * @apiParam {String} [model] Optional device model.
 *
 * @apiParamExample {Query} Request-Example (device):
 * 		/api/devices?manufacture=Samsung&model=S7
 *
 * @apiParamExample {Query} Request-Example (devies):
 * 		/api/devices
 *
 * @apiSuccess {Object} device A specific device.
 *
 * @apiSuccessExample {JSON} Success-Response-Example (device):
 *		 {
 *		   "_id": "58b5b6d71f5e070b14487a79",
 *		   "manufacture": "Samsung",
 *		   "model": "S7",
 *		   "__v": 0,
 *		   "meta": {
 *		     "times_requested": 2,
 *		     "created_at": "2017-02-28T17:43:51.387Z"
 *		   },
 *		   "profiles": [
 *		     {
 *		       "_id": "58b5b6d71f5e070b14487a78",
 *		       "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *		       "__v": 0,
 *		       "meta": {
 *		         "created_at": "2017-02-28T17:43:51.241Z"
 *		       },
 *		       "dir_output_wave": true,
 *		       "force_headset": 1,
 *		       "volume_adjust": 1,
 *		       "rec_buff_size": 64,
 *		       "baud": 7200,
 *		       "output_frq": 4800,
 *		       "input_frq": 2400
 *		     }
 *		   ]
 *		 }
 *
 * @apiSuccessExample {JSON} Success-Response-Example (devices):
 *		 [
 *		  {
 *		    "_id": "58b5b6d71f5e070b14487a79",
 *		    "manufacture": "Samsung",
 *		    "model": "S7",
 *		    "__v": 0,
 *		    "meta": {
 *		      "times_requested": 2,
 *		      "created_at": "2017-02-28T17:43:51.387Z"
 *		    },
 *		    "profiles": [
 *		      "58b5b6d71f5e070b14487a78"
 *		    ]
 *		  },
 *		  {
 *		    "_id": "58b5b9f6e7457120b00a52aa",
 *		    "manufacture": "Samsung",
 *		    "model": "S6",
 *		    "__v": 0,
 *		    "meta": {
 *		      "created_at": "2017-02-28T17:57:10.157Z"
 *		    },
 *		    "profiles": [
 *		      "58b5b9f6e7457120b00a52a9"
 *		    ]
 *		  }
 *		]
 *
 * @apiSuccess {Object[]} devices All devices in the database
 *
 * @apiError (Not Found 404) {String} Error Device was not found.
 * @apiError (Bad Request 400) {String} Error Request could not be processed.
 */
router.get('/', (req, res) => {
	if(req.query.manufacture && req.query.model){
		devicesUtils.getDeviceByManufactureAndModelAndPopulateAndIncrementRequestedCount(req.query.manufacture, req.query.model)
			.then(device => {
				if(!device){
					return res.sendStatus(404)
				}else{
					return res.send(device);
				}
			});
	}	else{
		devicesUtils.listAllDevices().then(deviceList => {
			if (!deviceList){
				return res.sendStatus(400);
			} else {
				return res.send(deviceList);
			}
		});
	}
});

router.post('/', (req, res) => {
	const { manufacture, model, deviceProfile } = req.body;

	if (!manufacture || !model || !deviceProfile)
		return res.sendStatus(400);

	devicesUtils.getDeviceByManufactureAndModelAndPopulate(manufacture, model)
		.then(device => {
			const newProfile = createNewProfile(deviceProfile);

			if (!device) { // Requested device does not exist in collection
				profilesUtils.createProfile(newProfile)
					.then(createdProfile => devicesUtils.createDevice({ manufacture, model, profiles: [createdProfile._id] }), () => res.sendStatus(400))
					.then(() => res.sendStatus(201), () => res.sendStatus(400));
			} else { // Requested device exists in the collection
				const profileExists = checkIfProfileExists(device.profiles, newProfile.profile_hash);

				if (profileExists)
					return res.sendStatus(200); // Sending OK status but do nothing since the profile already exists for the device

				// Here, we know that the device exists but does not contain the new profile so we are adding it
				profilesUtils.createProfile(newProfile)
					.then(createdProfile => devicesUtils.addProfileForDevice(device._id, createdProfile._id), () => res.sendStatus(400))
					.then(() => res.sendStatus(201), () => res.sendStatus(400))
			}
		}, () => res.sendStatus(400));
});

const createNewProfile = deviceProfile => {
	const { input_frq, output_frq, baud,
			rec_buff_size, volume_adjust, force_headset,
			dir_output_wave } = deviceProfile;

	const profile_hash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_headset + dir_output_wave);

	return { profile_hash, input_frq, output_frq, baud, rec_buff_size, volume_adjust, force_headset, dir_output_wave };
};

const checkIfProfileExists = (profiles, profileHashToCheck) => {
	return profiles.some(profile => profile.profile_hash === profileHashToCheck);
};

module.exports = router;
