var express = require('express');

var router = express.Router();

router.get("/", function(request, response) {
    response.json({message: "other test GET route hit"});
});


return router;