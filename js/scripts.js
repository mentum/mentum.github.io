$(document).ready(function() { 

	"use strict";

	// Variables
	
	var triggerVid;
	var launchkit_hoverGallery;


    // Disable default click on a with blank href

    $('a').click(function() {
        if ($(this).attr('href') === '#') {
            return false;
        }
    });
    
    // Smooth scroll to inner links
	
	$('.inner-link').smoothScroll({
		offset: -59,
		speed: 800
	});

    // TweenMAX Scrolling override on Windows for a smoother experience

    if (navigator.appVersion.indexOf("Win") != -1) {
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            $(function() {

                var $window = $(window);
                var scrollTime = 0.4;
                var scrollDistance = 350;

                $window.on("mousewheel DOMMouseScroll", function(event) {

                    event.preventDefault();

                    var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
                    var scrollTop = $window.scrollTop();
                    var finalScroll = scrollTop - parseInt(delta * scrollDistance);

                    TweenMax.to($window, scrollTime, {
                        scrollTo: {
                            y: finalScroll,
                            autoKill: true
                        },
                        ease: Power1.easeOut,
                        overwrite: 5
                    });

                });
            });
        }
    }

    // Set bg of nav container if dark skin
    
    if($('nav').hasClass('dark')){
    	$('.nav-container').addClass('dark');
    	$('.main-container').find('section:nth-of-type(1)').css('outline', '40px solid #222');
    }

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('nav').addClass('fixed');
        } else {
            $('nav').removeClass('fixed');
        }

        if ($(window).scrollTop() > $('section.header').innerHeight() - 250) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }

		if ($(window).scrollTop() > $('section.header').innerHeight()) {
			$('nav').addClass('dropnav');
		} else {
			$('nav').removeClass('dropnav');
		}
    });

    // Mobile nav

    $('.mobile-toggle').click(function() {
        $(this).closest('nav').toggleClass('nav-open');
        if ($(this).closest('nav').hasClass('nav-3')) {
            $(this).toggleClass('active');
        }
    });

    // Fixed header scrolling for desktop browsers

	parallaxBackground();
	$(window).scroll(function(){
		requestAnimationFrame(parallaxBackground);
	});

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $(window).scroll(function() {
            requestAnimationFrame(fixedHeader);
            
        });
    }

    // Initialize sliders

    $('.hero-slider').flexslider({
        directionNav: false
    });
    $('.slider').flexslider({
        directionNav: false
    });

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', '50% 50%');
    });
    
    // Fade in background images
	
	setTimeout(function(){
		$('.background-image-holder').each(function() {
			$(this).addClass('fadeIn');
		});
    },200);




    // Hover gallery
    $('.hover-gallery').each(function(){
    	var that = $(this);
    	var timerId = setInterval(function(){scrollHoverGallery(that);}, $(this).closest('.hover-gallery').attr('speed'));
		$(this).closest('.hover-gallery').attr('timerId', timerId );
		
		$(this).find('li').bind('hover, mouseover, mouseenter, click', function(e){
			e.stopPropagation();
			clearInterval(timerId);
		});
	
	});
	
    // Map overlay switch

    $('.map-toggle .switch').click(function() {
        $(this).closest('.contact').toggleClass('toggle-active');
        $(this).toggleClass('toggle-active');
    });


    // Sort tabs into 2 ul's

    $('.tabbed-content').each(function(){
    	$(this).append('<ul class="content"></ul>');
    });

    $('.tabs li').each(function(){
    	var originalTab = $(this), activeClass = "";
    	if(originalTab.is('.tabs li:first-child')){
    		activeClass = ' class="active"';
    	}
    	var tabContent = originalTab.find('.tab-content').detach().wrap('<li'+activeClass+'></li>').parent();
    	originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });

    $('.tabs li').click(function(){
    	$(this).closest('.tabs').find('li').removeClass('active');
    	$(this).addClass('active');
    	var liIndex = $(this).index() + 1;
    	$(this).closest('.tabbed-content').find('.content li').removeClass('active');
    	$(this).closest('.tabbed-content').find('.content li:nth-child('+liIndex+')').addClass('active');
    });

    // Remove screen when user clicks on the map, then add it again when they scroll
    
    $('.screen').click(function(){
    	$(this).removeClass('screen');
    });
    
    $(window).scroll(function(){
    	$('.contact-2 .map-holder').addClass('screen');
    });
});

$(window).load(function() { 

	"use strict";

    // Initialize twitter feed

    var setUpTweets = setInterval(function() {
        if ($('.tweets-slider').find('li.flex-active-slide').length) {
            clearInterval(setUpTweets);
            return;
        } else {
            if ($('.tweets-slider').length) {
                $('.tweets-slider').flexslider({
                    directionNav: false,
                    controlNav: false
                });
            }
        }
    }, 500);

    // Append Instagram BGs

    var setUpInstagram = setInterval(function() {
        if ($('.instafeed li').hasClass('bg-added')) {
            clearInterval(setUpInstagram);
            return;
        } else {
            $('.instafeed li').each(function() {

                // Append background-image <img>'s as li item CSS background for better responsive performance
                var imgSrc = $(this).find('img').attr('src');
                $(this).css('background', 'url("' + imgSrc + '")');
                $(this).find('img').css('opacity', 0);
                $(this).css('background-position', '50% 0%');
                // Check if the slider has a color scheme attached, if so, apply it to the slider nav
                $(this).addClass('bg-added');
            });
            $('.instafeed').addClass('fadeIn');
        }
    }, 500);

}); 

function scrollHoverGallery(gallery){
	var nextActiveSlide = $(gallery).find('li.active').next();

	if (nextActiveSlide.length === 0) {
		nextActiveSlide = $(gallery).find('li:first-child');
	}

	$(gallery).find('li.active').removeClass('active');
	nextActiveSlide.addClass('active');
}

function fixedHeader() {
    if ($(window).scrollTop() < $('.fixed-header').outerHeight()) {
        var scroll = $(window).scrollTop();
        if (scroll < 0) {
            $('.fixed-header').css({
                transform: 'translateY(0px)'
            });
        } else {
            $('.fixed-header').css({
                transform: 'translateY(' + scroll / 1.2 + 'px)'
            });
        }
    }
}

function parallaxBackground(){
	$('.parallax').each(function(){
		var element = $(this).closest('section');
		var scrollTop = $(window).scrollTop();
    	var scrollBottom = scrollTop + $(window).height();
    	var elemTop = element.offset().top;
    	var elemBottom = elemTop + element.outerHeight();

		if((scrollBottom > elemTop) && (scrollTop < elemBottom)){
			var value = ((scrollBottom - elemTop)/5);
			$(element).find('.parallax').css({
                transform: 'translateY(' + value + 'px)'
            });
            
		}
	});	
}
