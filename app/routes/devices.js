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
  res.sendStatus(200);
});

module.exports = router;
