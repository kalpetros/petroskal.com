$(function() {
    // Auto date update
    var date = new Date();
    var year = date.getFullYear();
    $('.footer').html('<p>&copy; ' + year + ' petroskal.com</p>');
    // Show main page
    $(".cover-container").fadeIn(2000);
    // Show emails on button click
    $("#email").click(function(){
	$(".email").slideDown( "slow", function() {
	    $(".email").show();
	});
	// Hide email after 5 seconds
	$(".email").delay(4000).slideUp();
    });
    // Buttons
    $('#twitter').click(function() {
	window.location.href = "https://twitter.com/kalpetross";
    });
    $('#github').click(function() {
	window.location.href = "https://github.com/kalpetros";
    });
    $('#linkedin').click(function() {
	window.location.href = "https://gr.linkedin.com/in/kalpetros";
    });
    $('#projects').click(function() {
	window.location.href = "/projects";
    });
    $('#blog').click(function() {
	window.location.href = "/blog";
    });
    // Side navigation
    $('.navigation-trigger').on('click', function() {
	$('.navigation-panel').animate({
	    left: '0'
	});
    });
    $('.container').on('click', function() {
	$('.navigation-panel').animate({
	    left: '-250px'
	});
    });
});