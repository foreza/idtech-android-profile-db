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
 *    [
 *      {
 *        "_id": "58b5b6d71f5e070b14487a78",
 *        "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *        "__v": 0,
 *        "meta": {
 *          "created_at": "2017-02-28T17:43:51.241Z"
 *        },
 *        "unipay_iii_fail": 0,
 *        "unipay_iii_suc": 0,
 *        "unipay_15_fail": 0,
 *        "unipay_15_suc": 0,
 *        "unipay_fail": 0,
 *        "unipay_suc": 0,
 *        "shuttle_fail": 0,
 *        "shuttle_suc": 0,
 *        "unimag_ii_fail": 0,
 *        "unimag_ii_suc": 0,
 *        "reverse_audio_events": 0,
 *        "force_headset": 0,
 *        "powerup_last_before_cmd": 200,
 *        "powerup_when_swipe": 0,
 *        "str_model": "",
 *        "shuttle_channel": 48,
 *        "use_voice_recognition": 0,
 *        "dir_output_wave": 0,
 *        "volume_adjust": 0,
 *        "rec_read_buffer_size": 0,
 *        "rec_buff_size": 0,
 *        "baud": 7200,
 *        "output_frq": 4800,
 *        "input_frq": 2400
 *      },
 *      {
 *        "_id": "58b5b9f6e7457120b00a52a9",
 *        "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *        "__v": 0,
 *        "meta": {
 *          "created_at": "2017-02-28T17:57:10.137Z"
 *        },
 *        "unipay_iii_fail": 0,
 *        "unipay_iii_suc": 0,
 *        "unipay_15_fail": 0,
 *        "unipay_15_suc": 0,
 *        "unipay_fail": 0,
 *        "unipay_suc": 0,
 *        "shuttle_fail": 0,
 *        "shuttle_suc": 0,
 *        "unimag_ii_fail": 0,
 *        "unimag_ii_suc": 0,
 *        "reverse_audio_events": 0,
 *        "force_headset": 1,
 *        "powerup_last_before_cmd": 200,
 *        "powerup_when_swipe": 0,
 *        "str_model": "",
 *        "shuttle_channel": 48,
 *        "use_voice_recognition": 0,
 *        "dir_output_wave": 0,
 *        "volume_adjust": 1,
 *        "rec_read_buffer_size": 0,
 *        "rec_buff_size": 0,
 *        "baud": 7200,
 *        "output_frq": 4800,
 *        "input_frq": 2400
 *      }
 *    ]
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
 *    [
 *      {
 *        "_id": "58b5b6d71f5e070b14487a78",
 *        "profile_hash": "11f372bf5fc808f640fc78fb8565bd6e7efdc0e64d011c07d34317f6dd87fad5",
 *        "__v": 0,
 *        "meta": {
 *          "created_at": "2017-02-28T17:43:51.241Z"
 *        },
 *        "unipay_iii_fail": 0,
 *        "unipay_iii_suc": 0,
 *        "unipay_15_fail": 0,
 *        "unipay_15_suc": 0,
 *        "unipay_fail": 0,
 *        "unipay_suc": 0,
 *        "shuttle_fail": 0,
 *        "shuttle_suc": 0,
 *        "unimag_ii_fail": 0,
 *        "unimag_ii_suc": 0,
 *        "reverse_audio_events": 0,
 *        "force_headset": 0,
 *        "powerup_last_before_cmd": 200,
 *        "powerup_when_swipe": 0,
 *        "str_model": "",
 *        "shuttle_channel": 48,
 *        "use_voice_recognition": 0,
 *        "dir_output_wave": 0,
 *        "volume_adjust": 0,
 *        "rec_read_buffer_size": 0,
 *        "rec_buff_size": 0,
 *        "baud": 7200,
 *        "output_frq": 4800,
 *        "input_frq": 2400
 *      }
 *    ]
 *
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

/**
 * @api {PATCH} /api/profiles/increment/:id PATCH /api/profiles/increment/:id
 * @apiDescription Increments a profile's device's success or failure counter.
 * @apiName PatchProfilesIncrement
 * @apiGroup Profiles
 *
 * @apiParam {Object} profileToPatch An object containing the device and field to increment.
 * @apiParam {String="unimag_ii","shuttle","unipay","unipay_15","unipay_iii"} profileToPatch.reader The reader to increment the counter for.
 * @apiParam {Boolean} profileToPatch.success Whether to increment the success or failure field.
 *
 * @apiParamExample {String} Request-Example (URL):
 * 		/api/profiles/increment/58b5b6d71f5e070b14487a78
 *
 * @apiParamExample {JSON} Request-Example (body):
 *    {
 *      "reader:": "unipay_15",
 *      "success": true
 *    }
 *
 * @apiSuccess {String} Success The device's success or failure counter for the corresponding profile was incremented.
 *
 * @apiError (Bad Request 400) Error The request could not be processed.
 */
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
