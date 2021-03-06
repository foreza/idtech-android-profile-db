var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeviceSchema   = new Schema({
    manufacture: {
            type: String,
            require: true
    },
    model       : {
        type:String,
        require: true
    },
    profiles    : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    meta        : {
        created_at: {
            type: Date,
            default: Date.now
        },
        times_requested:{
            type:Number,
            default: 0
        }

    }
});

DeviceSchema.index({manufacture: 1, model: 1}, {unique: true});

module.exports = mongoose.model('Device', DeviceSchema);
