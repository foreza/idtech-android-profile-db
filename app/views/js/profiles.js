//

// On document ready

$( document ).ready(function() {

  // Do a GET to api/profiles to retrieve a list of profiles
  $.get( "api/profiles", function( data ) {

    // With the response, create the table elements
    for (var i = 0; i < data.length; ++i){
      $( "<tr id='profile-" + i + "'>" +
      '<td class="id-truncate">' + data[i]._id + '</td>' +
      '<td class="hash-truncate">' + data[i].profile_hash + '</td>' +
      '<td class="date-line">' + moment(data[i].meta.created_at).format('MM-DD-YYYY') + '</td>' +
      '<td>' + data[i].input_frq + '</td>' +
      '<td>' + data[i].output_frq + '</td>' +
      '<td>' + data[i].baud + '</td>' +
      '<td>' + data[i].rec_buff_size + '</td>' +
      '<td>' + data[i].volume_adjust + '</td>' +
      '<td>' + data[i].force_headset + '</td>' +
      '<td>' + data[i].dir_output_wave + '</td>' +
      "</tr>" ).appendTo( "#profile-table" );
      }
    });
});
