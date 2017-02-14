const express = require('express');
const router = express.Router();

const CryptoJS = require('crypto-js');

// router.post('/')
//     .post(function(request, response){
//
//         var device = new Device();
//         device.model = request.body.model;
//         device.manufacture = request.body.manufacture;
//         device.profiles = [];
//
//         device.save(function(error){
//             if (error){
//                 response.send(error);
//             }
//
//             response.json({message:"device created"});
//         });
//     })

router.post('/', (req, res) => {
	const { input_frq = 0, output_frq = 0, baud = 0,
			rec_buff_size = 0, volume_adjust = 0, force_hedset = 0,
			dir_output_wave = 0} = req.body;

	const sum = input_frq + output_frq + baud + rec_buff_size + volume_adjust + force_hedset + dir_output_wave;

	const profile_hash = CryptoJS.SHA256(sum.toString()).toString(CryptoJS.enc.Hex);

	res.send(profile_hash);
});

module.exports = router;
