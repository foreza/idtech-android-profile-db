
$( document ).ready(function() {

    $('.modal').modal();
});

// Function called by the page to submit the form
// TODO: Provide basic form validation / form defaults
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
    
    _displaySubmittedInformation(formData);


    $.post( "api/devices", formData, function( data ) {
        console.log(data);
    });

    return false;

}

function _displaySubmittedInformation (rd) {

  $('#modal-replace').empty();
  
  $('<h3>' + 'Device: ' + rd.manufacture + ' ' + rd.model + '</h3>' +  
      '<p>' + 'input_frq: '+ rd.deviceProfile.input_frq + '</p>' +
      '<p>' + 'output_frq: '+ rd.deviceProfile.output_frq + '</p>' +
      '<p>' + 'baud: '+ rd.deviceProfile.baud + '</p>' +
      '<p>' + 'rec_buff_size: '+ rd.deviceProfile.rec_buff_size + '</p>' +
      '<p>' + 'rec_read_buffer_size: '+ rd.deviceProfile.rec_read_buffer_size + '</p>' +
      '<p>' + 'volume_adjust: '+ rd.deviceProfile.volume_adjust + '</p>' +
      '<p>' + 'dir_output_wave: '+ rd.deviceProfile.dir_output_wave + '</p>' +
      '<p>' + 'use_voice_recognition: '+ rd.deviceProfile.use_voice_recognition + '</p>' +
      '<p>' + 'shuttle_channel: '+ rd.deviceProfile.shuttle_channel + '</p>' +
      // '<p>' + 'str_model: '+ rd.deviceProfile.str_model + '</p>' +
      '<p>' + 'powerup_when_swipe: '+ rd.deviceProfile.powerup_when_swipe + '</p>' +
      '<p>' + 'powerup_last_before_cmd: '+ rd.deviceProfile.powerup_last_before_cmd + '</p>' +
      '<p>' + 'force_headset: '+ rd.deviceProfile.force_headset + '</p>' +
      '<p>' + 'reverse_audio_events: '+ rd.deviceProfile.reverse_audio_events + '</p>' +
      '</div></br>').appendTo('#modal-replace');

  $('#new-modal').modal('open');

    }



// Utility function that fetches device information from form fields
function _retrieveDeviceInformation(){
    
    var deviceModel = $('#device_model').val();
    var deviceMake = $('#device_make').val();

    var data = {
        'model' :  deviceModel,
        'manufacture' : deviceMake
    }

    return data;
}

// Utility function that fetches profile information from form fields
function _retrieveProfileInformation(){

    var inputFrequency = $('#input_frq').val();
    var outputFrequency = $('#output_frq').val();
    var baud = $('#baud').val();
    var recBuffSize = $('#rec_buff_size').val();
    var recReadBuffSize = $('#rec_read_buffer_size').val();
    var shuttleChannel = $('#shuttle_channel').val();
    var strModel = $('#str_model').val();
    var powerupLastBeforeCmd = $('#powerup_last_before_cmd').val();
    var volumeAdjust = $('#volume_adjust').is(':checked') ? 1 : 0;
    var dirOutputWave = $('#dir_output_wave').is(':checked') ? 1 : 0;
    var useVoiceRecognition = $('#use_voice_recognition').is(':checked')  ? 1 : 0;
    var powerupWhenSwipe = $('#powerup_when_swipe').is(':checked') ? 1 : 0;
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

    return _profileDataValidation(data);

}

// Helper function that sets defaults and validates input
function _profileDataValidation(p){

    var data = p;

    var def = {
        'input_frq' : 2400,
        'output_frq' : 4800,
        'baud' : 9600,
        'rec_buff_size' : 0,
        'rec_read_buffer_size' : 0,
        'shuttle_channel' : 48,
        'str_model' : "",
        'volume_adjust' : 0,
        'dir_output_wave' : 0,
        'use_voice_recognition' : 0,
        'powerup_when_swipe' : 0,
        'powerup_last_before_cmd' : 200,
        'force_headset' : 0,
        'reverse_audio_events' : 0,
    };

    // Iterate through existing values and set defaults as needed
    for (var key in p) {
        if (p.hasOwnProperty(key)) {
            console.log(key + " -> " + p[key]);
            
            // If there is no value or the values is null, assume default
            
            if (p[key] == null || p[key] == ''){
                p[key] = def[key];
            }
        }
    }
    
    return data;
}
