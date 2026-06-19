/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // Force scroll to top on reload
    window.scrollTo(0, 0);

    /*------------------
        Preloader
    --------------------*/
    var $percentage = $('#loader-percentage');
    var currentPercent = 0;
    
    // Start animation immediately, update less frequently (100ms) to save CPU
    var fakeInterval = setInterval(function() {
        if (currentPercent < 99) {
            currentPercent += (99 - currentPercent) * 0.1;
            $percentage.text(Math.floor(currentPercent) + '%');
        }
    }, 100);

    $(window).on('load', function () {
        var $videos = $('video');
        var totalVideos = $videos.length;
        var fallbackTimeout;

        function hidePreloader() {
            // First, fade out the small inner elements
            $(".loader").fadeOut();
            $percentage.fadeOut();

            // Give the browser 400ms to rest and Masonry to calculate, 
            // then fade out the massive black background
            $("#preloder").delay(400).fadeOut(600, function() {
                $('body').removeClass('no-scroll');
            });
        }

        if (totalVideos === 0) {
            clearInterval(fakeInterval);
            $percentage.text('100%');
            hidePreloader();
        } else {
            var checkInterval = setInterval(function() {
                var ready = 0;
                $videos.each(function() {
                    // readyState >= 3 means data is available for current and future frames
                    if (this.readyState >= 3) {
                        ready++;
                    }
                });

                if (ready >= totalVideos) {
                    clearInterval(checkInterval);
                    clearInterval(fakeInterval);
                    clearTimeout(fallbackTimeout);
                    $percentage.text('100%');
                    hidePreloader();
                }
            }, 300);

            // Fallback
            fallbackTimeout = setTimeout(function() {
                clearInterval(checkInterval);
                clearInterval(fakeInterval);
                $percentage.text('100%');
                hidePreloader();
            }, 7000);
        }
    });

    /*------------------
        Smooth Scroll
    --------------------*/
    $("a[href^='#']").on('click', function(e) {
        var hash = this.hash;
        if (hash !== "") {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 800);
        }
    });


    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe',
        callbacks: {
            beforeOpen: function() {
                if (this.st.el.hasClass('vertical-video')) {
                    this.st.mainClass = 'mfp-vertical-video';
                }
            }
        }
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        var $this = $(this);
        var targetValue = parseInt($this.text());
        var suffix = $this.data('suffix') || '';
        
        $this.prop('Counter', 0).animate({
            Counter: targetValue
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                var currentVal = Math.ceil(now);
                var displayVal = currentVal >= 1000 ? currentVal.toLocaleString('uk-UA') : currentVal;
                $this.text(displayVal + suffix);
            }
        });
    });

    /*------------------
        Password Lock
    --------------------*/
    if (typeof USE_PASSWORD !== 'undefined' && USE_PASSWORD) {
        // Перевіряємо, чи введений раніше пароль співпадає з поточним PAGE_PASSWORD.
        // Це змусить просити пароль знову, якщо ви його зміните в HTML.
        if (localStorage.getItem('portfolio_unlocked_password') !== PAGE_PASSWORD) {
            var overlay = document.getElementById('password-overlay');
            var pInput = document.getElementById('password-input');
            var pSubmit = document.getElementById('password-submit-btn');
            var pError = document.getElementById('password-error');
            var pBox = document.querySelector('.password-box');
            var originalOverflow = document.body.style.overflow;
            
            if (overlay) {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Блокуємо скрол

                function checkPassword() {
                    if (pInput.value === PAGE_PASSWORD) {
                        localStorage.setItem('portfolio_unlocked_password', PAGE_PASSWORD);
                        overlay.style.opacity = '0'; // Плавне зникнення
                        setTimeout(function() {
                            overlay.style.display = 'none';
                            document.body.style.overflow = originalOverflow;
                        }, 500);
                    } else {
                        pError.style.display = 'block';
                        pBox.classList.remove('shake-error');
                        void pBox.offsetWidth; // trigger reflow
                        pBox.classList.add('shake-error');
                        pInput.value = ''; // Очистити поле
                    }
                }

                pSubmit.addEventListener('click', checkPassword);
                pInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') checkPassword();
                });
            }
        }
    }

})(jQuery);