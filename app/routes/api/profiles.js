const router = require('express').Router();

const devicesUtils = require('../../utilities/devices');
const profilesUtils = require('../../utilities/profiles');

/**
 * @api {GET} /api/profiles GET /api/profiles
 * @apiDescription Gets all profiles in the database.
 * @apiName GetProfiles
 * @apiGroup Profiles
 *
 * @apiExample {js} Request-Example:
 * 		/api/profiles
 *
 * @apiSuccess {Object[]} profiles All profiles in the database.
 *
 * @apiSuccessExample {JSON} Success-Response-Example:
 *	 [
 *	   {
 *	     "_id": "58b5b6d71f5e070b14487a78",
 *	     "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *	     "__v": 0,
 *	     "meta": {
 *	       "created_at": "2017-02-28T17:43:51.241Z"
 *	     },
 *	     "dir_output_wave": true,
 *	     "force_headset": 1,
 *	     "volume_adjust": 1,
 *	     "rec_buff_size": 64,
 *	     "baud": 7200,
 *	     "output_frq": 4800,
 *	     "input_frq": 2400
 *	   },
 *	   {
 *	     "_id": "58b5b9f6e7457120b00a52a9",
 *	     "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *	     "__v": 0,
 *	     "meta": {
 *	       "created_at": "2017-02-28T17:57:10.137Z"
 *	     },
 *	     "dir_output_wave": true,
 *	     "force_headset": 1,
 *	     "volume_adjust": 1,
 *	     "rec_buff_size": 64,
 *	     "baud": 7200,
 *	     "output_frq": 4800,
 *	     "input_frq": 2400
 *	   }
 *	 ]
 *
 * @apiError (Not Found 404) {String} Error No devices were found.
 */
router.get('/', (req, res) => {
		profilesUtils.listAllProfiles().then(profileList => {
			if (!profileList){
				return res.sendStatus(400);
			} else {
				return res.send(profileList);
			}
		});
});

/**
 * @api {GET} /api/profiles/:id GET /api/profiles/:id
 * @apiDescription Gets a profile by its unique ID.
 * @apiName GetProfile
 * @apiGroup Profiles
 *
 * @apiParam {String} id The profile's unique ID.
 *
 * @apiParamExample {Query} Request-Example:
 * 		/api/profiles/58b5b6d71f5e070b14487a78
 *
 * @apiSuccess {Object} profile A specific profile.
 *
 * @apiSuccessExample {JSON} Success-Response-Example:
 *	 [
 *	   {
 *	     "_id": "58b5b6d71f5e070b14487a78",
 *	     "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *	     "__v": 0,
 *	     "meta": {
 *	       "created_at": "2017-02-28T17:43:51.241Z"
 *	     },
 *	     "dir_output_wave": true,
 *	     "force_headset": 1,
 *	     "volume_adjust": 1,
 *	     "rec_buff_size": 64,
 *	     "baud": 7200,
 *	     "output_frq": 4800,
 *	     "input_frq": 2400
 *	   }
 *	 ]
 * @apiError (Not Found 404) {String} Error A device was not found.
 */
router.get('/:id', (req, res) => {
  profilesUtils.findProfileByUniqueID(req.params.id).then(profile =>{
    if (!profile) {
      return res.sendStatus(404);
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
