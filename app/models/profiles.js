var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    profile_hash: String,
    input_frq: Number,
    output_frq: Number,
    baud: Number,
    rec_buff_size: Number,
    volume_adjust: Number,
    force_headset: Number,
    dir_output_wave: Boolean,
    unimag_ii_suc: Number,
    unimag_ii_fail: Number,
    shuttle_suc: Number,
    shuttle_fail: Number,
    unipay_suc: Number,
    unipay_fail: Number,
    unipay_15_suc: Number,
    unipay_15_fail: Number,
    unipay_iii_suc: Number,
    unipay_iii_fail: Number,
    meta: {
        created_at: {
            type: Date,
            default: Date.now
        },
        times_requested: { type:Number }
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
