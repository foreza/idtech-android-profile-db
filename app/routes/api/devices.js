const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

router.post('/', (req, res) => {
	const { manufacture, model } = req.body;

	if (!manufacture || !model)
		res.sendStatus(400);

	devicesUtils.getDeviceByManufactureAndModel(manufacture, model)
		.then(device => {
			// NOTE: It would be great if we can figure out a way to collapse the conditional inside this promise's resolve, the following promises are currently two levels deep (1 level deep would be ideal)

			if (!device) { // Requested device does not exist in collection

				const newProfile = createNewProfile(req.body);

				profilesUtils.createProfile(newProfile)
					.then(createdProfile => devicesUtils.createDevice({ manufacture, model, profiles: [createdProfile._id] }), () => res.sendStatus(400))
					.then(createdDevice => devicesUtils.getDeviceByIDAndPopulate(createdDevice._id), () => res.sendStatus(400))
					.then(device => res.json(device), () => res.sendStatus(404));
			} else { // Requested device exists in the collection
				const { input_frq = 0, output_frq = 0, baud = 0,
						rec_buff_size = 0, volume_adjust = 0, force_headset = 0,
						dir_output_wave = false } = req.body;

				const inputProfileHash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_headset + dir_output_wave);

				// TODO: Determine if the device already contains the same profile as the input one (check profile_hash) and if so, just return some status code (200?)

				// TODO: If the device does not contain the input profile (its profile_hash is unique to the device), create a new profile and push it onto the device's profiles array

				res.sendStatus(501); // TODO: Remove this, currently used to prevent hanging
			}
		}, () => res.sendStatus(404));
});

const createNewProfile = profileObj => {
	const { input_frq = 0, output_frq = 0, baud = 0,
			rec_buff_size = 0, volume_adjust = 0, force_headset = 0,
			dir_output_wave = false } = profileObj;

	const profile_hash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_headset + dir_output_wave);

	return { profile_hash, input_frq, output_frq, baud, rec_buff_size, volume_adjust, force_headset, dir_output_wave };
};

module.exports = router;
