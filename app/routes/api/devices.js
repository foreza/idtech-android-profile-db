const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

// TODO: Secure this route and disallow public usage of this route
//TODO: commet route
router.get('/', (req, res) => {
	if(req.query.manufacture && req.query.model){
		console.log(req.query);
		devicesUtils.getDeviceByManufactureAndModelAndPopulate(req.query.manufacture, req.query.model)
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

//TODO: comment route
router.post('/', (req, res) => {
	const { manufacture, model, deviceProfile } = req.body;

	if (!manufacture || !model)
		return res.sendStatus(400);

	devicesUtils.getDeviceByManufactureAndModelAndPopulate(manufacture, model)
		.then(device => {
			const newProfile = createNewProfile(req.body);

			if (!device) { // Requested device does not exist in collection
				profilesUtils.createProfile(newProfile)
					.then(createdProfile => devicesUtils.createDevice({ manufacture, model, profiles: [createdProfile._id] }), () => res.sendStatus(400))
					.then(() => res.sendStatus(200), () => res.sendStatus(400));
			} else { // Requested device exists in the collection
				const profileExists = checkIfProfileExists(device.profiles, newProfile.profile_hash);

				if (profileExists)
					return res.sendStatus(200); // Sending OK status but do nothing since the profile already exists for the device

				// Here, we know that the device exists but does not contain the new profile so we are adding it
				profilesUtils.createProfile(newProfile)
					.then(createdProfile => devicesUtils.addProfileForDevice(device._id, createdProfile._id), () => res.sendStatus(400))
					.then(() => res.sendStatus(200), () => res.sendStatus(400))
			}
		}, () => res.sendStatus(404));
});

const createNewProfile = (profileBody) => {
	const input_frq = profileBody.deviceProfile.input_frq;
	const output_frq = profileBody.deviceProfile.output_frq;
	const baud = profileBody.deviceProfile.baud;
	const rec_buff_size = profileBody.deviceProfile.rec_buff_size;
	const volume_adjust = profileBody.deviceProfile.volume_adjust;
	const force_headset = profileBody.deviceProfile.force_headset;
	const dir_output_wave = profileBody.deviceProfile.dir_output_wave;

	const profile_hash = profilesUtils.generateSHA256HexString(input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_headset + dir_output_wave);

	return { profile_hash, input_frq, output_frq, baud, rec_buff_size, volume_adjust, force_headset, dir_output_wave };
};

const checkIfProfileExists = (profiles, profileHashToCheck) => {
	return profiles.some(profile => profile.profile_hash === profileHashToCheck);
};

module.exports = router;
