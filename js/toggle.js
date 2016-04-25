$(document).ready(function() {
  // Show name & description
  $('.cover-heading').hide();
  $('.lead').hide();
  $('.cover-heading').fadeIn();
  $('.lead').fadeIn();
  // Hide email
  $(".email").hide();
  // Show email on button click
  $("#email").click(function(){
    $(".email").slideDown( "slow", function() {
      $(".email").show();
    });
    // Hide email after 5 seconds
    $('.email').delay(4000).slideUp();
  });
});
