$(function() {
    $('.hidden').fadeIn(2000);
    
    var list = $('.list li');
    var index = 1;

    $('.list-container').html(list[0].innerHTML);

    $('.listhandler').on('click', function() {
	if (index < list.length) {
	    $('.list-container').html(list[index].innerHTML);
	    index = index + 1;
	} else {
	    $('.list-container').html(list[0].innerHTML);
	    index = 1;
	}
    });
});
