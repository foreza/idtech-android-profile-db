var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    profile_hash: String,
    input_frq: {                                // private int frequencyInput = '뮀';
      type: Number, default: 2400 },
    output_frq: {                               // private int frequencyOutput = '뮀';
      type: Number, default: 4800 },
    baud: {                                     // private int baudRate = 9600; 
      type: Number, default: 7200 },
    rec_buff_size: {                            // private int iRecordBufferSize = 0; 
      type: Number, default: 0 },
    rec_read_buffer_size: {                     // private int iRecordReadBufferSize = 0; 
      type: Number, default: 0 },
    volume_adjust: {                            // private short volumeLevelAdjust = 0; 
      type: Number, default: 0 },
    dir_output_wave: {                          // private short directionOutputWave = 0; 
      type: Boolean, default: true },
    use_voice_recognition: {                    // private short useVOICE_RECOGNIZITION = 0; 
      type: Number, default: 0 },
    shuttle_channel: {                          // private byte shuttleChannel = 48;
      type: Number, default: 48 },
    str_model: {                                // private String strModel = ""; 
      type: String, default: "" },
    powerup_when_swipe: {                       // private short powerupWhenSwipe = 0;
      type: Number, default: 0 },
    powerup_last_before_cmd: {                  // private short powerupLastBeforeCMD = 200; 
      type: Number, default: 200 },
    force_headset: {                            // private short forceHeadsetPlug = 0;  
      type: Number, default: 0 },
    reverse_audio_events: {                     // private short reverseAudioEvents = 0;
      type: Number, default: 0 },
    // TODO: Update the methods that increment  the support status, nest all the suc/fail under support_status
    // support_status : { }                     // private SupportStatus[] supportStatuses = new SupportStatus[DEVICE_TYPE.values().length];
      unimag_ii_suc: {
        type: Number,
        default: 0
      },
      unimag_ii_fail: {
        type: Number,
        default: 0
      },
      shuttle_suc: {
        type: Number,
        default: 0
      },
      shuttle_fail: {
        type: Number,
        default: 0
      },
      unipay_suc: {
        type: Number,
        default: 0
      },
      unipay_fail: {
        type: Number,
        default: 0
      },
      unipay_15_suc: {
        type: Number,
        default: 0
      },
      unipay_15_fail: {
        type: Number,
        default: 0
      },
      unipay_iii_suc: {
        type: Number,
        default: 0
      },
      unipay_iii_fail: {
        type: Number,
        default: 0
      },
    meta: {
        created_at: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);


// TODO: OPTIMIZATION
/* Not included in Schema */
// 1) private String versionToTestOtherDirection = null; should be considered or added
// 2) Boolean vs Short vs Number standardization (map all 0/1 values to Bools, etc..)


// Schema referenced:

/*
 private int frequencyInput = '뮀'; //input_frq (done, check)
    private int iRecordReadBufferSize = 0; // NOT SUPPORTED (added, rec_read_buffer_size)
    private int iRecordBufferSize = 0; //rec_buff_size
    private short useVOICE_RECOGNIZITION = 0; // Not supported (added, use_voice_recognition)
    private int frequencyOutput = '뮀'; // output_frq (done, check)
    private short directionOutputWave = 0; //dir_output_wave
    private String versionToTestOtherDirection = null; //not supported. may not be needed. ignore for now
    private int baudRate = 9600; //baud (done, check)
    private byte shuttleChannel = 48; //// NOT SUPPORTED (added, shuttle_channel)
    private String strModel = ""; // NOT SUPPORTED (added, str_model)
    private SupportStatus[] supportStatuses = new SupportStatus[DEVICE_TYPE.values().length]; //various suc & fail metrics (updated by moving all support stats into an object, support_status)
    private short powerupWhenSwipe = 0; // NOT SUPPORTED (added, powerup_when_swipe)
    private short powerupLastBeforeCMD = 200; // NOT SUPPORTED (added, powerup_last_before_cmd)
    private short forceHeadsetPlug = 0;  // NOT SUPPORTED (added, force_headset_plug)
    private short volumeLevelAdjust = 0; //volume_adjust
    private short reverseAudioEvents = 0;// NOT SUPPORTED (added, reverse_audio_events)


*/