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

    /*------------------
        Preloader V6
    --------------------*/
    var $percentage = $('#loader-percentage');
    var currentPercent = 0;
    
    // --- V11 UI Elements ---
    const ringFill = document.getElementById('ringFill');
    const bgText = document.getElementById('bgText');
    const hudWrapper = document.getElementById('hudWrapper');
    const c1 = document.getElementById('c1');
    const c3 = document.getElementById('c3');
    const icons = document.querySelectorAll('.floating-element');
    const consoleEl = document.getElementById('rapidConsole');
    const aiStatus = document.getElementById('aiStatus');
    const circumference = 1068;
    let matrixColor = '#00ffcc';

    // Matrix Background
    const canvas = document.getElementById('matrixCanvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        for(let x = 0; x < columns; x++) drops[x] = 1;
        setInterval(() => {
            ctx.fillStyle = 'rgba(2, 2, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = matrixColor;
            ctx.font = fontSize + 'px monospace';
            for(let i = 0; i < drops.length; i++) {
                const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }, 33);
    }

    // Console logs
    if(consoleEl) {
        const logs = [
            "Compiling WebGL shaders...", "Analyzing video metadata...", "Applying heuristic filters...",
            "Decrypting Cloudinary tokens...", "Establishing secure CDN link...", "Syncing keyframes...",
            "Optimizing H.265 streams...", "Loading AI upscaler model...", "Injecting CSS variables..."
        ];
        setInterval(() => {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.innerText = `> ${logs[Math.floor(Math.random() * logs.length)]} [OK]`;
            consoleEl.prepend(line);
            if(consoleEl.children.length > 3) consoleEl.removeChild(consoleEl.lastChild);
        }, 200);
    }

    // Scramble logic
    const scrambleChars = '0123456789!@#$%^&*()';
    function scrambleStatus(finalValue) {
        if(!aiStatus) return;
        let iterations = 0;
        const interval = setInterval(() => {
            aiStatus.innerText = finalValue.split('').map((char, index) => {
                if(index < iterations) return char;
                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join('');
            if(iterations >= finalValue.length) clearInterval(interval);
            iterations += 1/2;
        }, 30);
    }

    let activePhase = 0;
    function setPhase(phase) {
        if (activePhase === phase || !bgText) return;
        activePhase = phase;
        if (phase === 1) { // 0-33%
            matrixColor = '#00ffcc'; bgText.innerText = 'DOWNLOADING MEDIA';
            if(ringFill) { ringFill.style.stroke = '#00ffcc'; ringFill.style.filter = 'drop-shadow(0 0 10px #00ffcc)'; }
            if($percentage.length) $percentage[0].style.textShadow = '0 0 20px rgba(0, 255, 204, 0.8)';
            if(consoleEl) consoleEl.style.color = 'rgba(0,255,204,0.7)';
            if(c1) c1.style.borderColor = 'rgba(0, 255, 204, 0.4)';
            if(c3) { c3.style.borderColor = '#00ffcc transparent #00ffcc transparent'; c3.style.boxShadow = '0 0 15px rgba(0,255,204,0.2) inset, 0 0 15px rgba(0,255,204,0.2)'; }
            if(hudWrapper) hudWrapper.style.transform = window.innerWidth > 768 ? 'scale(1)' : 'scale(0.65)';
            if(bgText) bgText.style.transform = 'translate(-50%, -50%) scale(1)';
            scrambleStatus("UPLOADING NEURAL DATA");
        } else if (phase === 2) { // 33-66%
            matrixColor = '#ffaa00'; bgText.innerText = 'PROCESSING AI';
            if(bgText) bgText.style.transform = 'translate(-50%, -50%) scale(1.1)';
            if(ringFill) { ringFill.style.stroke = '#ffaa00'; ringFill.style.filter = 'drop-shadow(0 0 15px #ffaa00)'; }
            if($percentage.length) $percentage[0].style.textShadow = '0 0 25px rgba(255, 170, 0, 0.9)';
            if(consoleEl) consoleEl.style.color = 'rgba(255, 170, 0, 0.7)';
            if(c1) c1.style.borderColor = 'rgba(255, 170, 0, 0.4)';
            if(c3) { c3.style.borderColor = '#ffaa00 transparent #ffaa00 transparent'; c3.style.boxShadow = '0 0 25px rgba(255, 170, 0, 0.4) inset, 0 0 25px rgba(255,170,0,0.4)'; }
            if(hudWrapper) hudWrapper.style.transform = window.innerWidth > 768 ? 'scale(1.1)' : 'scale(0.75)';
            icons.forEach(i => i.style.color = 'rgba(255, 170, 0, 0.1)');
            scrambleStatus("APPLYING VFX FILTERS");
        } else if (phase === 3) { // 66-95%
            matrixColor = '#ff003c'; bgText.innerText = 'CRITICAL LOAD';
            if(bgText) bgText.style.transform = 'translate(-50%, -50%) scale(1.2)';
            if(ringFill) { ringFill.style.stroke = '#ff003c'; ringFill.style.filter = 'drop-shadow(0 0 20px #ff003c)'; }
            if($percentage.length) $percentage[0].style.textShadow = '0 0 30px rgba(255, 0, 60, 1)';
            if(consoleEl) consoleEl.style.color = 'rgba(255, 0, 60, 0.7)';
            if(c1) c1.style.borderColor = 'rgba(255, 0, 60, 0.4)';
            if(c3) { c3.style.borderColor = '#ff003c transparent #ff003c transparent'; c3.style.boxShadow = '0 0 30px rgba(255, 0, 60, 0.6) inset, 0 0 30px rgba(255,0,60,0.6)'; }
            if(hudWrapper) hudWrapper.style.transform = window.innerWidth > 768 ? 'scale(1.2)' : 'scale(0.85)';
            icons.forEach(i => i.style.color = 'rgba(255, 0, 60, 0.1)');
            document.body.style.background = '#1a0005';
            scrambleStatus("FINALIZING RENDER");
        } else if (phase === 4) { // 96-99% Hyper-drive
            matrixColor = '#ffffff'; bgText.innerText = 'SYSTEM READY';
            if(bgText) { bgText.style.color = 'rgba(255,255,255,0.1)'; bgText.style.transform = 'translate(-50%, -50%) scale(1.3)'; }
            if(ringFill) { ringFill.style.stroke = '#ffffff'; ringFill.style.filter = 'drop-shadow(0 0 30px #ffffff)'; }
            if($percentage.length) { $percentage[0].style.textShadow = '0 0 40px rgba(255, 255, 255, 1)'; $percentage[0].style.transform = 'scale(1.1)'; }
            if(consoleEl) consoleEl.style.opacity = '0';
            if(c1) c1.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            if(c3) { c3.style.borderColor = '#ffffff transparent #ffffff transparent'; c3.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.8) inset, 0 0 40px rgba(255,255,255,0.8)'; }
            if(hudWrapper) hudWrapper.style.transform = window.innerWidth > 768 ? 'scale(1.3)' : 'scale(0.95)';
            icons.forEach(i => i.style.color = 'rgba(255, 255, 255, 0.3)');
            scrambleStatus("INITIATING LAUNCH");
        }
    }

    setPhase(1);

    function updatePreloaderUI(pct) {
        if(ringFill) {
            const offset = circumference - (pct / 100) * circumference;
            ringFill.style.strokeDashoffset = offset;
        }
        $percentage.text(Math.floor(pct) + '%');
        
        if (pct >= 33 && pct < 66) setPhase(2);
        if (pct >= 66 && pct < 96) setPhase(3);
        if (pct >= 96 && pct <= 100) setPhase(4);
    }

    // Start UI update loop
    var fakeInterval = setInterval(function() {
        if (currentPercent < 98) {
            currentPercent += (98 - currentPercent) * 0.15;
            updatePreloaderUI(currentPercent);
        }
    }, 100);

    let hasFlashed = false;
    var checkInterval, fallbackTimeout;

    function triggerFlashAndHide() {
        $('#preloder').fadeTo(0, 0, function() {
            $(this).css('display', 'none');
            
            // Force play all native autoplay videos
            $('video[autoplay]').each(function() {
                var p = this.play();
                if (p && typeof p.catch === 'function') {
                    p.catch(function(e) { console.log('Autoplay blocked:', e); });
                }
            });
        });
        clearInterval(checkInterval);
        clearTimeout(fallbackTimeout);

        if(hasFlashed) return;
        hasFlashed = true;
        
        clearInterval(fakeInterval); 

        currentPercent = 100;
        updatePreloaderUI(100);
        scrambleStatus("SYSTEM ONLINE");
        matrixColor = '#ffffff';

        // Миттєве зникнення, як у Версії 8
        if(hudWrapper) $(hudWrapper).fadeTo(200, 0);
        if(bgText) $(bgText).fadeTo(200, 0);
        $percentage.fadeTo(200, 0);

        $("#preloder").delay(100).fadeTo(500, 0, function() {
            $(this).css({'pointer-events': 'none', 'display': 'none'});
        });
    }

    // IMMEDIATELY start checking, do NOT wait for window.load to avoid hanging the site
    var $videos = $('video');
    var totalVideos = $videos.length;

    if (totalVideos === 0) {
        clearInterval(fakeInterval);
        triggerFlashAndHide();
    } else {
        checkInterval = setInterval(function() {
            var ready = 0;
            $videos.each(function() {
                if (this.readyState >= 3) {
                    ready++;
                }
            });

            if (ready >= totalVideos) {
                triggerFlashAndHide();
            }
        }, 300);

        // ABSOLUTE MAXIMUM FALLBACK - Forces the site to open after 5.5 seconds no matter what!
        fallbackTimeout = setTimeout(function() {
            triggerFlashAndHide();
        }, 5500); 
    }

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
                var url = this.st.el.attr('href');
                if (url && url.indexOf('.mp4') !== -1) {
                    this.st.iframe.markup = '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><video class="mfp-iframe" autoplay controls playsinline style="object-fit: contain; background: #000;"></video></div>';
                } else {
                    this.st.iframe.markup = '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>';
                }
                
                if (this.st.el.hasClass('vertical-video')) {
                    this.st.mainClass = 'mfp-vertical-video';
                } else {
                    this.st.mainClass = '';
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