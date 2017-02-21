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

module.exports = router;
