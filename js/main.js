$(document).ready(function() {
  // Show name & description
  $(".inner").hide();
  $(".inner").fadeIn(2000);
  // Hide email
  $(".email").hide();
  // Show email on button click
  $("#email").click(function(){
    $(".email").slideDown( "slow", function() {
      $(".email").show();
    });
    // Hide email after 5 seconds
    $(".email").delay(4000).slideUp();
  });
});
