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
 * @apiSuccess {Object[]} devices All devices in the database
 *
 * @apiSuccessExample {JSON} Success-Response-Example (device):
 *    {
 *      "_id": "58b5b6d71f5e070b14487a79",
 *      "manufacture": "Samsung",
 *      "model": "S7",
 *      "__v": 0,
 *      "meta": {
 *        "times_requested": 2,
 *        "created_at": "2017-02-28T17:43:51.387Z"
 *      },
 *      "profiles": [
 *        {
 *          "_id": "58b5b6d71f5e070b14487a78",
 *          "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *          "__v": 0,
 *          "meta": {
 *            "created_at": "2017-02-28T17:43:51.241Z"
 *          },
 *          "unipay_iii_fail": 0,
 *          "unipay_iii_suc": 0,
 *          "unipay_15_fail": 0,
 *          "unipay_15_suc": 0,
 *          "unipay_fail": 0,
 *          "unipay_suc": 0,
 *          "shuttle_fail": 0,
 *          "shuttle_suc": 0,
 *          "unimag_ii_fail": 0,
 *          "unimag_ii_suc": 0,
 *          "reverse_audio_events": 0,
 *          "force_headset": 0,
 *          "powerup_last_before_cmd": 200,
 *          "powerup_when_swipe": 0,
 *          "str_model": "",
 *          "shuttle_channel": 48,
 *          "use_voice_recognition": 0,
 *          "dir_output_wave": 0,
 *          "volume_adjust": 0,
 *          "rec_read_buffer_size": 0,
 *          "rec_buff_size": 0,
 *          "baud": 7200,
 *          "output_frq": 4800
 *          "input_frq": 2400
 *        }
 *      ]
 *    }
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
 * @apiError (Not Found 404) {String} Error The device or devices could not be found.
 * @apiError (Bad Request 400) {String} Error The request could not be processed.
 */
router.get('/', (req, res) => {

	console.log('req: man' + req.query.manufacture + " mod " + req.query.model);

	if(req.query.manufacture && req.query.model){
		devicesUtils.getDeviceByManufactureAndModelAndPopulateAndIncrementRequestedCount(req.query.manufacture, req.query.model)
			.then(device => {
				if(!device){
					return res.sendStatus(404)
				}else{
					return res.send(device);
				}
			});
	}	

	else if (req.query.manufacture) {

		console.log('manufacture case');


		devicesUtils.getDeviceByManufacture(req.query.manufacture)
			.then(device => {
				if(!device){
					return res.sendStatus(404)
				}else{
					return res.send(device);
				}
			});
	}

	else if (req.query.model) {

				console.log('model case');

		devicesUtils.getDeviceByModel(req.query.model)
			.then(device => {
				if(!device){
					return res.sendStatus(404)
				}else{
					return res.send(device);
				}
			});
	}



	else{

		console.log('last case');

		devicesUtils.listAllDevices().then(deviceList => {
			if (!deviceList){
				return res.sendStatus(400);
			} else {
				return res.send(deviceList);
			}
		});
	}
});

/**
 * @api {POST} /api/devices POST /api/devices
 * @apiDescription Attempts to add a device and profile to the database.
 *
 * There are three possible outcomes when using this route.
 * 1) The device with the specified manufacture and model does not exist.
 *
 * Both the device and profile documents will be created. The profile document will be associated with the device document via an object ID and can be joined.
 *
 * 2) The device with the specified manufacture and model exists but the specified profile does not exist for that device.
 *
 * The new profile document will be created and the corresponding device document will have an assocation to the new profile document via an object ID.
 *
 * 3) The device with the specified manufacture and model exists and the specified profile already exist for the device.
 *
 * The route will return an OK status but nothing will be done regarding modifying the collections.
 *
 * @apiName PostDevices
 * @apiGroup Devices
 *
 * @apiParam {Object} deviceAndProfile An object containing the device's manufacture, model, and desired profile attributes.
 * @apiParam {String} deviceAndProfile.manufacture Device manufacture.
 * @apiParam {String} deviceAndProfile.model Device model.
 * @apiParam {Object} deviceAndProfile.deviceProfile The desired profile to add.
 * @apiParam {Number} deviceAndProfile.deviceProfile.input_frq The input frequency.
 * @apiParam {Number} deviceAndProfile.deviceProfile.output_frq The output frequency.
 * @apiParam {Number} deviceAndProfile.deviceProfile.baud The baud.
 * @apiParam {Number} deviceAndProfile.deviceProfile.rec_buff_size The recommended buffer size.
 * @apiParam {Number} deviceAndProfile.deviceProfile.rec_read_buffer_size The recommended read buffer size.
 * @apiParam {Number} deviceAndProfile.deviceProfile.volume_adjust The volume adjust.
 * @apiParam {Number} deviceAndProfile.deviceProfile.dir_output_wave The directional output wave.
 * @apiParam {Number} deviceAndProfile.deviceProfile.use_voice_recognition If voice recognition is allowed.
 * @apiParam {Number} deviceAndProfile.deviceProfile.shuttle_channel The shuttle channel.
 * @apiParam {String} deviceAndProfile.deviceProfile.str_model The model string.
 * @apiParam {Number} deviceAndProfile.deviceProfile.powerup_when_swipe If the device should power up on swipe.
 * @apiParam {Number} deviceAndProfile.deviceProfile.powerup_last_before_cmd If the device should power up last before a command.
 * @apiParam {Number} deviceAndProfile.deviceProfile.force_headset The force headset.
 * @apiParam {Number} deviceAndProfile.deviceProfile.reverse_audio_events If audio events should be reversed.
 *
 * @apiParamExample {JSON} Request-Example:
 *    {
 *      "model": "S7",
 *      "manufacture": "Samsung",
 *      "deviceProfile":
 *      {
 *        "input_frq" : 2400,
 *        "output_frq" : 4800,
 *        "baud" : 7200,
 *        "rec_buff_size" : 0,
 *        "rec_read_buffer_size" : 0,
 *        "volume_adjust" : 0,
 *        "dir_output_wave" : 0,
 *        "use_voice_recognition" : 0,
 *        "shuttle_channel" : 48,
 *        "str_model" : "",
 *        "powerup_when_swipe" : 0,
 *        "powerup_last_before_cmd" : 200,
 *        "force_headset" : 0,
 *        "reverse_audio_events" : 0,
 *      }
 *    }
 *
 * @apiSuccess {String} Success A device with the corresponding profile already exists.
 * @apiSuccess (Created 201) {String} Success Either the new device and its corresponding profile has been created or a new profile was created for an existing device.
 *
 * @apiError (Bad Request 400) {String} Error The request could not be proccesed.
 */
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
		rec_buff_size, rec_read_buffer_size, volume_adjust,
		dir_output_wave, use_voice_recognition, shuttle_channel,
		str_model, powerup_when_swipe, powerup_last_before_cmd,
		force_headset, reverse_audio_events } = deviceProfile;

	const profile_hash = profilesUtils.generateSHA256HexString(
		input_frq +
		output_frq +
		baud +
		rec_buff_size +
		rec_read_buffer_size +
		volume_adjust +
		dir_output_wave +
		use_voice_recognition +
		shuttle_channel +
		powerup_when_swipe +
		powerup_last_before_cmd +
		force_headset +
		reverse_audio_events
	);

	return { profile_hash, input_frq, output_frq,
		baud, rec_buff_size, rec_read_buffer_size,
		volume_adjust, dir_output_wave, use_voice_recognition,
		shuttle_channel, str_model, powerup_when_swipe,
		powerup_last_before_cmd, force_headset, reverse_audio_events };
};

const checkIfProfileExists = (profiles, profileHashToCheck) => {
	return profiles.some(profile => profile.profile_hash === profileHashToCheck);
};

module.exports = router;
