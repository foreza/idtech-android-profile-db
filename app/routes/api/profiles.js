const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

// Hitting the base route returns all profiles.
router.get('/', (req, res) => {
		profilesUtils.listAllProfiles().then(profileList => {
			if (!profileList){
				return res.sendStatus(400);
			} else {
				return res.send(profileList);
			}
		});
});

// Lookup by the mongo ID (more for administrative panel purposes, end users should not be using this)
router.get('/:id', (req, res) => {
  profilesUtils.findProfileByUniqueID(req.params.id).then(profile =>{
    if (!profile) {
      return res.sendStatus(400);
    } else {
      return res.send(profile);
    }
  })
});

router.patch('/increment/:id', (req, res) => {
	const profileID = req.params.id;
	const { reader, success } = req.body;

	if (!profileID || !reader || !success)
		return res.sendStatus(400);

	const fieldToIncrement = `${ reader }_${ success ? "suc" : "fail" }`;

	profilesUtils.incrementDeviceCounter(profileID, fieldToIncrement)
		.then(() => res.sendStatus(200), () => res.sendStatus(400));
});

module.exports = router;
