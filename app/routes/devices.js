const express = require('express');
const router = express.Router();

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
	const { input_frq, output_frq, baud,
			rec_buff_size, volume_adjust, force_hedset,
			dir_output_wave, unimag_ii_suc, unimag_ii_fail,
			shuttle_suc, shuttle_fail, unipay_suc,
			unipay_fail, unipay_15_suc, unipay_15_fail,
			unipay_iii_suc, unipay_iii_fail } = req.body;
});

module.exports = router;
