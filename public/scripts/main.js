
$(document).ready(function(){
	let images = document.querySelectorAll("img");
	lazyload(images);



	$('.burger').on('click', function(){

		if ($('.navigation-mobile').hasClass('expanded')) {
			$('.navigation-mobile').removeClass('expanded')

		} else{
			$('.navigation-mobile').addClass('expanded')
		
		}
	})


	if($('body').hasClass('vault-body')){
		var items = $('.vault-item')
		var positions = []
		for (var i = items.length - 1; i >= 0; i--) {
			var randomLeft = Math.floor(Math.random() * 110); 
			var randomTop = Math.floor(Math.random() * 110); 
			$(items[i]).css('margin-top',randomTop + 'px').css('margin-left', randomLeft +'px');
		}
		var randomAngle = Math.floor(Math.random() * (45 - (-45) + 1) + (-45));
		var randomLeft = Math.floor(Math.random() * ($(window).width() - $('.vault-sticker').outerWidth()));
		var randomTop = Math.floor(Math.random() * (20 - (1) + 1) + (1));
		$('.vault-sticker').css('left', + randomLeft).css('top', 65 + ($('#bigtext').outerHeight() * 2.5 )+'px').css('transform', 'rotate('+ randomAngle +'deg)').css('-webkit-transform', 'rotate('+ randomAngle +'deg)').css('-moz-transform', 'rotate('+ randomAngle +'deg)')
	


		/* auto scroll code  */
		var scroll;
		var tobe = true;
		var tobecount = 0;
		function start_scroll_down() { 
		   scroll = setInterval(function(){ 
		   	if(tobe == true || tobecount > 50){
		   		tobecount = 0;
		   		tobe = true
		   		window.scrollBy(0, 1);
		   	} else{
		   		tobecount = tobecount + 1;
		   	}
		   }, 30);
		}
		start_scroll_down()
		$(window).mousemove(function(){
			tobe = false
		})

	}
// if(!$('body').hasClass('home')){

// 	var myMargin = ($(window).height()/4) * 2
// 	$('.page-wrapper').css('margin-top', myMargin + 'px')
// }

if($('body').hasClass('home')){
	window.onscroll = function() {myFunction()};
	window.onresize = function() {meow()}
	var $navbar = $(".navigation");
	var sticky = $('.hero-video').outerHeight()


	
	function myFunction() {
	  if (window.pageYOffset >= sticky) {
	    $navbar.addClass("sticky")
	  } else {
	    $navbar.removeClass("sticky");
	  }
	}

	function meow(){
		var myMargin = $('.hero-video').height()
		$('.page-wrapper').css('margin-top', myMargin + 'px')
	}



	$('.page-wrapper').css('margin-top', ($(window).height() - $('.intro-studio').outerHeight() - 88) + 'px')
	console.log($('.hero-video').innerHeight() - 200)
}
	
	if($('body').hasClass('vault-body')){
		jQuery("#bigtext").fitText(0.39, { });
	}
if($('body').hasClass('work')){
	jQuery("#bigtext").fitText(0.36, { });
	var $carousel = $('.featured-carousel').flickity({
		prevNextButtons: false,
		draggable: false,
		fade: true
	})
	var myMargin = $('#bigtext').height()
	$('.page-wrapper').css('margin-top', (myMargin/3 * 2) + 'px')
	var mynow = 0;
	$('.button-group').on( 'click', '.button', function() {
	  var index = $(this).index();
	  $('.button').removeClass('selected')
	  mynow = index;
	  for (var i = $('.button-group').length - 1; i >= 0; i--) {
	  	$($($('.button-group')[i]).find('.button')[mynow]).addClass('selected')
	  }
	  // $($('.button')[mynow]).addClass('selected')
	  $carousel.flickity( 'select', index );
	});

}


if($('body').hasClass('project-page')){
	window.onscroll = function() {myFunction()};

	var $navbar = $(".navigation");
	var sticky = $('.project-banner').outerHeight()


	
	function myFunction() {
	  if (window.pageYOffset >= sticky) {
	    $navbar.addClass("sticky")
	  } else {
	    $navbar.removeClass("sticky");
	  }
	}
	var stickyMargin = $('.navigation').outerHeight()
	var myMargin = ($(window).height()/5) * 4
	$('.page-wrapper').css('margin-top', myMargin + stickyMargin + 'px')
	$('.project-banner').css('top', stickyMargin + 'px')
	
}
if($('body').hasClass('info')){

	$('.page-wrapper').css('margin-top', (($('#bigtext').height())/3 * 2) + 'px')
	jQuery("#bigtext").fitText(0.273, { });
	$('#bigtext').css('margin-top', -1 * ($('#bigtext').height()/10))
	var myMargin = ($(window).height()/4) * 2
	var one$navbar = $(".secondary-navigation");
	var onesticky = one$navbar.offset().top 
	var onesticky2 = one$navbar.offset().top - $('.navigation').outerHeight()

	var two$navbar = $(".tertiary-navigation");
	var twosticky = two$navbar.offset().top + (myMargin * 2)
	var twosticky2 = two$navbar.offset().top + (myMargin) - one$navbar.outerHeight()
	var three$navbar = $(".fourth-navigation");
	var threesticky = three$navbar.offset().top + (myMargin * 2)
	var threesticky2 = three$navbar.offset().top + (myMargin) - two$navbar.outerHeight()

	function one(){
	  if (window.pageYOffset >= onesticky) {
	    one$navbar.addClass("almost")
	    one$navbar.addClass("sticky")
	  } else {
	    one$navbar.removeClass("almost");
	    one$navbar.removeClass("sticky");
	  }

	}
	function two(){
	  if (window.pageYOffset >= twosticky) {
	    two$navbar.addClass("sticky")
	    two$navbar.addClass("almost")
	  } else {
	    two$navbar.removeClass("sticky");
	    two$navbar.removeClass("almost");
	  }

	}
	// 	function three(){

	// 	  if (window.pageYOffset >= threesticky) {
	// 	    three$navbar.addClass("sticky")
	// 	    three$navbar.addClass("almost")
	// 	  } else {
	// 	    three$navbar.removeClass("sticky");
	// 	    three$navbar.removeClass("almost");
	// 	  }

	// }

	window.onscroll = function(){

		one()
		two()
		three()
	}



}







//////
if($('body').hasClass('work')){



	var myMargin = ($(window).height()/4) * 2
	var one$navbar = $(".secondary-navigation");
	var onesticky = one$navbar.offset().top
	var onesticky2 = one$navbar.offset().top - $('.navigation').outerHeight()

	var two$navbar = $(".tertiary-navigation");
	var twosticky = two$navbar.offset().top
	var twosticky2 = two$navbar.offset().top - one$navbar.outerHeight()

	function one(){
	

	

	  if (window.pageYOffset >= onesticky) {
	    one$navbar.addClass("sticky")
	    one$navbar.addClass("almost")
	    // $('.navigation').addClass('go-away')
	  } else {
	    one$navbar.removeClass("sticky");
	    // $('.navigation').removeClass('go-away')
	    one$navbar.removeClass("almost");
	  }


	  // if (window.pageYOffset >= onesticky2) {
	  //   one$navbar.addClass("almost")
	  // } else {
	  //   one$navbar.removeClass("almost");
	  // }

	}
	function two(){
		

      

	  if (window.pageYOffset >= twosticky) {
	    two$navbar.addClass("sticky")
	    two$navbar.addClass("almost")
	  } else {
	    two$navbar.removeClass("sticky");
	    two$navbar.removeClass("almost");
	  }
	

	  // if (window.pageYOffset >= twosticky2) {
	  //   two$navbar.addClass("almost")
	  // } else {
	  // 	console.log('moom')
	  //   two$navbar.removeClass("almost");
	  // }

	}


	window.onscroll = function(){

		one()
		two()

	}



}

$('#project-info-trigger').on('click', function(){
	if($('.project-info-box').hasClass('expanded')){
		$('.project-info-box').removeClass('expanded')
	} else{
		$('.project-info-box').addClass('expanded')
	}
})

})
