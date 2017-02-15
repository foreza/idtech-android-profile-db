const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

router.post('/', (req, res) => {
	const { manufacture, model } = req.body;

	if (!manufacture || !model)
		res.sendStatus(400);

	devicesUtils.getDeviceByManufactureAndModelAndPopulate(manufacture, model)
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

				/*
					QUESTION: Is there some way to leverage MongoDB/Mongoose to check if a specific profile exists for the device passed from the previous promise (i.e. 'device' variable)?
								We are currently just iterating through the profiles array to check
				*/
				const profileExists = checkIfProfileExists(device.profiles, inputProfileHash);

				if (profileExists)
					res.sendStatus(200); // Sending OK status but do nothing since the same profile already exists for the device.

				res.json({ profileExists });

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

const checkIfProfileExists = (profiles, profileHashToCheck) => {
	return profiles.some(profile => profile.profile_hash === profileHashToCheck);
};

module.exports = router;
