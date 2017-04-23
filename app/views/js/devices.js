

var rData;

// On document ready
$( document ).ready(function() {
   
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // Do a GET to api/devices to retrieve a list of devices
  $.get( "api/devices", function( data ) {

    rData = data;

    // With the response, create the table elements
    for (var i = 0; i < data.length; ++i){
      $( "<tr id='device-" + i + "'>" +
      '<td>' + data[i].model + '</td>' +
      '<td>' + data[i].manufacture + '</td>' +
      '<td>' + data[i].profiles.length + '</td>' +
      '<td onclick="_displayAssociatedProfiles(' + i + ')">VIEW</td>' +
      "</tr>" ).appendTo( "#device-table" );
      }
      });

});

// Lazy approach - use the existing data and display.

// Given the listed index, 

function _displayAssociatedProfiles (i) {

  $('#modal-replace').empty();

  for (var d = 0; d < rData[i].profiles.length; ++d){
    $.get( "api/profiles/" + rData[i].profiles[d], 
    // On success
    function( rd ) {
      $('<div><a href="/api/profiles/' + rd[0]._id + '"><b> Profile#' + rd[0]._id + '</b></a>' +
      '<p>' + 'input_frq: '+ rd[0].input_frq + '</p>' +
      '<p>' + 'output_frq: '+ rd[0].output_frq + '</p>' +
      '<p>' + 'baud: '+ rd[0].baud + '</p>' +
      '<p>' + 'rec_buff_size: '+ rd[0].rec_buff_size + '</p>' +
      '<p>' + 'rec_read_buffer_size: '+ rd[0].rec_read_buffer_size + '</p>' +
      '<p>' + 'volume_adjust: '+ rd[0].volume_adjust + '</p>' +
      '<p>' + 'dir_output_wave: '+ rd[0].dir_output_wave + '</p>' +
      '<p>' + 'use_voice_recognition: '+ rd[0].use_voice_recognition + '</p>' +
      '<p>' + 'shuttle_channel: '+ rd[0].shuttle_channel + '</p>' +
      // '<p>' + 'str_model: '+ rd[0].str_model + '</p>' +
      '<p>' + 'powerup_when_swipe: '+ rd[0].powerup_when_swipe + '</p>' +
      '<p>' + 'powerup_last_before_cmd: '+ rd[0].powerup_last_before_cmd + '</p>' +
      '<p>' + 'force_headset: '+ rd[0].force_headset + '</p>' +
      '<p>' + 'reverse_audio_events: '+ rd[0].reverse_audio_events + '</p>' +
      '</div></br>').appendTo('#modal-replace')
    });
  
  $('#profile-modal').modal('open');


  }
}

// TODO: Better approach - support sorting / pagination as well