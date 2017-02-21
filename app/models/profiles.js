var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    profile_hash: String,
    input_frq: {
      type: Number,
      default: 2400
    },
    output_frq: {
      type: Number,
      default: 4800
    },
    baud: {
      type: Number,
      default: 7200
    },
    rec_buff_size: {
      type: Number,
      default: 64
    },
    volume_adjust: {
      type: Number,
      default: 1
    },
    force_headset: {
      type: Number,
      default: 1
    },
    dir_output_wave: {
      type: Boolean,
      default: true
    },
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
