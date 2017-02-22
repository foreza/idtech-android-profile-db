
// On document ready
$( document ).ready(function() {

  // Do a GET to api/devices to retrieve a list of devices
  $.get( "api/devices", function( data ) {

    // With the response, create the table elements
    for (var i = 0; i < data.length; ++i){
      $( "<tr id='device-" + i + "'>" +
      '<td>' + data[i].model + '</td>' +
      '<td>' + data[i].manufacture + '</td>' +
      '<td>' + data[i].profiles.length + '</td>' +
      "</tr>" ).appendTo( "#device-table" );
      }
      });

});
