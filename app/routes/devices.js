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
		.then(createdProfile => devicesUtils.createDevice({ manufacture, model, profiles: [createdProfile._id] }), () => res.sendStatus(400))
		.then(createdDevice => devicesUtils.getDeviceByIDAndPopulate(createdDevice._id), () => res.sendStatus(400))
		.then(device => res.json(device), () => res.sendStatus(404));
});

const createNewProfile = profileObj => {
	const { input_frq = 0, output_frq = 0, baud = 0,
			rec_buff_size = 0, volume_adjust = 0, force_headset = 0,
			dir_output_wave = false } = profileObj;

	const profile_hash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_headset + dir_output_wave);

	return { profile_hash, input_frq, output_frq, baud, rec_buff_size, volume_adjust, force_headset, dir_output_wave };
};

module.exports = router;
