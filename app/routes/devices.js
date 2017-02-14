const express = require('express');
const router = express.Router();

const devicesUtils = require('../utilities/devices');
const profilesUtils = require('../utilities/profiles');

router.post('/', (req, res) => {
	const { manufacture, model, input_frq = 0, output_frq = 0, baud = 0,
			rec_buff_size = 0, volume_adjust = 0, force_hedset = 0,
			dir_output_wave = 0} = req.body;

	if (!manufacture || !model)
		res.sendStatus(400);

	const profile_hash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_hedset + dir_output_wave);

	const newDevice = { manufacture, model };

	devicesUtils.createDevice(newDevice)
		.then(createdDevice => res.json(createdDevice),
			err => handleExistingDevice(res, err));
});

const handleExistingDevice = (res, err) => {
	res.send(err);
};

module.exports = router;
