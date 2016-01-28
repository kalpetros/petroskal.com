// Hide email & pgp
$( ".email" ).hide();
$( ".pgp" ).hide();

// Show email on button click
$("#email").click(function(){
  $(".email").slideDown( "slow", function() {
    $(".email").show();
  });
  // Hide email after 5 seconds
  $(document).ready( function() {
    $('.email').delay(4000).slideUp();
  });
});

// Show pgp on button click
$("#pgp").click(function(){
  $(".pgp").slideDown( "slow", function() {
    $(".pgp").show();
  });
  // Hide pgp after 5 seconds
  $(document).ready( function() {
    $('.pgp').delay(4000).slideUp();
  });
});
