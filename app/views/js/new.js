

$( document ).ready(function() {



});

function submitForm() {
    
    var deviceData = _retrieveDeviceInformation();
    var profileData = _retrieveProfileInformation();

    var formData = {
       "model": deviceData.model,
       "manufacture": deviceData.manufacture,

       "deviceProfile":
        {
            "input_frq" : profileData.input_frq,
            "output_frq" : profileData.output_frq,
            "baud" : profileData.baud,
            "rec_buff_size" : profileData.rec_buff_size,
            "rec_read_buffer_size" : profileData.rec_read_buffer_size,
            "volume_adjust" : profileData.volume_adjust,
            "dir_output_wave" : profileData.dir_output_wave,
            "use_voice_recognition" : profileData.use_voice_recognition,
            "shuttle_channel" : profileData.shuttle_channel,
            "str_model" : profileData.str_model,
            "powerup_when_swipe" : profileData.powerup_when_swipe,
            "powerup_last_before_cmd" : profileData.powerup_last_before_cmd,
            "force_headset" : profileData.force_headset,
            "reverse_audio_events" : profileData.reverse_audio_events,
        }
    }

    $.post( "api/devices", formData, function( data ) {
        console.log(data);
    });




    


    
    
    alert('form submitted');

}


function _retrieveDeviceInformation(){
    
    var deviceModel = $('#device_model').val();
    var deviceMake = $('#device_make').val();

    var data = {
        'model' :  deviceModel,
        'manufacture' : deviceMake
    }

    return data;
}

function _retrieveProfileInformation(){

    var inputFrequency = $('#input_frq').val();
    var outputFrequency = $('#output_frq').val();
    var baud = $('#baud').val();
    var recBuffSize = $('#rec_buff_size').val();
    var recReadBuffSize = $('#rec_read_buffer_size').val();
    var shuttleChannel = $('#shuttle_channel').val();
    var strModel = $('#str_model').val();
    var volumeAdjust = $('#volume_adjust').is(':checked') ? 1 : 0;
    var dirOutputWave = $('#dir_output_wave').is(':checked') ? 1 : 0;
    var useVoiceRecognition = $('#use_voice_recognition').is(':checked')  ? 1 : 0;
    var powerupWhenSwipe = $('#powerup_when_swipe').is(':checked') ? 1 : 0;
    var powerupLastBeforeCmd = $('#powerup_last_before_cmd').is(':checked') ? 1 : 0;
    var forceHeadset = $('#force_headset').is(':checked') ? 1 : 0;
    var reverseAudioEvents = $('#reverse_audio_events').is(':checked') ? 1 : 0;


    var data = {
        'input_frq' : inputFrequency,
        'output_frq' : outputFrequency,
        'baud' : baud,
        'rec_buff_size' : recBuffSize,
        'rec_read_buffer_size' : recReadBuffSize,
        'shuttle_channel' : shuttleChannel,
        'str_model' : strModel,
        'volume_adjust' : volumeAdjust,
        'dir_output_wave' : dirOutputWave,
        'use_voice_recognition' : useVoiceRecognition,
        'powerup_when_swipe' : powerupWhenSwipe,
        'powerup_last_before_cmd' : powerupLastBeforeCmd,
        'force_headset' : forceHeadset,
        'reverse_audio_events' : reverseAudioEvents,
    }

    return data;


}
