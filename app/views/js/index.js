$( document ).ready(function() {

  // $.get( "api/devices", function( data ) {
  //   for (var i = 0; i < data.length; ++i){
  //     $( "<div id='device-" + i + "'>" +
  //     '<p>Device Model : ' + data[i].model + '</p>' +
  //     '<p>Device Manufacture : ' + data[i].manufacture + '</p>' +
  //     '<p># of Profiles : ' + data[i].profiles.length + '</p>' +
  //     "</div></br>" ).appendTo( "#result-device" );
  //     }
  //     });
  //
  // $.get( "api/profiles", function( data ) {
  //   for (var i = 0; i < data.length; ++i){
  //     $( "<div id='profile-" + i + "'>" +
  //       '<p>Unique Profile Hash : ' + data[i].profile_hash + '</p>' +
  //       '<p>Input Frequency : ' + data[i].input_frq + '</p>' +
  //       '<p>Output Frequency : ' + data[i].output_frq + '</p>' +
  //       '<p>Baud : ' + data[i].baud + '</p>' +
  //       '<p>Rec buff size : ' + data[i].rec_buff_size + '</p>' +
  //       '<p>Volume Adjust : ' + data[i].volume_adjust + '</p>' +
  //       '<p>Force Headset : ' + data[i].force_headset + '</p>' +
  //       '<p>Output Wave : ' + data[i].dir_output_wave + '</p>' +
  //       "</div></br>" ).appendTo( "#result-profile" );
  //     }
  //   });

    // This function populates the devices "highest times requested"
  $.get("admin/stats/device/highestTimesRequested", function( data ) {
    $( "#top-device").html(data.manufacture + " " +data.model);
    $( "#top-device-times-req").html(data.meta.times_requested);
    $( "#top-device-num-profiles").html(data.profiles.length);
  });

  // This function populates the table for most requested devices
  $.get("admin/stats/devices/highestTimesRequested", function( data) {
    console.log(data);
    for (var i = 0; i < data.length; ++i){
      $( "<tr id='device-" + i + "'>" +
      '<td>' + data[i].model + " " + data[i].manufacture + '</td>' +
      '<td>' + data[i].meta.times_requested + '</td>' +
      '<td>' + data[i].profiles.length + '</td>' +
      "</tr>" ).appendTo( "#common-device-table" );
    }
  });

});
