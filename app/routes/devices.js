const express = require('express');
const router = express.Router();

const devicesUtils = require('../utilities/devices');
const profilesUtils = require('../utilities/profiles');

router.post('/', (req, res) => {
	const { manufacture, model } = req.body;

	if (!manufacture || !model)
		res.sendStatus(400);

	// TODO: Determine if the device already exists in the database and if so, determine if the device already contains the input profile
	// Below is for when the input device does not exist in the database

	const newProfile = createNewProfile(req.body);

	profilesUtils.createProfile(newProfile)
		.then(createdProfile => {
			const newDevice = { manufacture, model, profiles: [createdProfile._id] };

			createNewDeviceInCollection(res, newDevice)
		}, err => res.sendStatus(400));
});

const createNewProfile = profileObj => {
	const { input_frq = 0, output_frq = 0, baud = 0,
			rec_buff_size = 0, volume_adjust = 0, force_headset = 0,
			dir_output_wave = false } = profileObj;

	const profile_hash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_headset + dir_output_wave);

	return { profile_hash, input_frq, output_frq, baud, rec_buff_size, volume_adjust, force_headset, dir_output_wave };
};

const createNewDeviceInCollection = (res, newDevice) => {
	devicesUtils.createDevice(newDevice)
		.then(createdDevice => respondWithPopulatedCreatedDevice(res, createdDevice._id),
			err => res.sendStatus(400));
};

const respondWithPopulatedCreatedDevice = (res, deviceID) => {
	devicesUtils.getDeviceByIDAndPopulate(deviceID)
		.then(device => res.json(device),
			err => res.sendStatus(404));
};

module.exports = router;
