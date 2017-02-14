const express = require('express');
const router = express.Router();

const CryptoJS = require('crypto-js');

router.post('/', (req, res) => {
	const { manufacture, model, input_frq = 0, output_frq = 0, baud = 0,
			rec_buff_size = 0, volume_adjust = 0, force_hedset = 0,
			dir_output_wave = 0} = req.body;

	if (!manufacture || !model)
		res.sendStatus(400);

	const sum = input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_hedset + dir_output_wave;

	const profile_hash = CryptoJS.SHA256(sum.toString()).toString(CryptoJS.enc.Hex);

	res.send(profile_hash);
});

module.exports = router;
