/* ============================================
   POLOSOFT TECHNOLOGIES - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Preloader ---
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById('preloader').classList.add('loaded');
        }, 800);
    });

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = 'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.transform = 'translate(' + (outlineX - 18) + 'px, ' + (outlineY - 18) + 'px)';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Grow cursor on interactive elements
        document.querySelectorAll('a, button, .service-card, .portfolio-card').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.borderColor = 'rgba(63, 185, 80, 0.8)';
            });
            el.addEventListener('mouseleave', function () {
                cursorOutline.style.width = '36px';
                cursorOutline.style.height = '36px';
                cursorOutline.style.borderColor = 'rgba(63, 185, 80, 0.4)';
            });
        });
    }

    // --- Navbar Scroll ---
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link on scroll
        updateActiveNav();
    });

    function updateActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }

    // --- Mobile Menu ---
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Typing Effect ---
    var phrases = ['& Platforms', '& Innovation', '& Solutions', '& Growth'];
    var typedEl = document.getElementById('typedText');
    var phraseIdx = 0, charIdx = 0, isDeleting = false;

    function typeEffect() {
        var currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        var speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // --- Counter Animation ---
    var counters = document.querySelectorAll('.stat-number[data-target]');
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { counterObserver.observe(c); });

    function animateCounter(el, target) {
        var start = 0;
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    // --- Portfolio Filters ---
    var filterBtns = document.querySelectorAll('.filter-btn');
    var portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(function (item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Testimonials Slider ---
    var track = document.getElementById('testimonialTrack');
    var cards = track.querySelectorAll('.testimonial-card');
    var prevBtn = document.getElementById('testiPrev');
    var nextBtn = document.getElementById('testiNext');
    var dotsContainer = document.getElementById('testiDots');
    var currentSlide = 0;

    // Create dots
    cards.forEach(function (_, i) {
        var dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { goToSlide(i); });
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dotsContainer.querySelectorAll('.dot').forEach(function (d, i) {
            d.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', function () {
        goToSlide(currentSlide === 0 ? cards.length - 1 : currentSlide - 1);
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1);
    });

    // Auto-advance testimonials
    setInterval(function () {
        goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1);
    }, 6000);

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var faqItem = btn.parentElement;
            var answer = faqItem.querySelector('.faq-answer');
            var isActive = faqItem.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function (item) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- Contact Form ---
    var contactForm = document.getElementById('contactForm');
    var thankyouModal = document.getElementById('thankyouModal');
    var closeThankYou = document.getElementById('closeThankYou');

    contactForm.addEventListener('submit', function () {
        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(function () {
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            thankyouModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 2000);
    });

    closeThankYou.addEventListener('click', function () {
        thankyouModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.querySelector('.thankyou-overlay').addEventListener('click', function () {
        thankyouModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // --- Newsletter Form ---
    var newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = newsletterForm.querySelector('input');
        var btn = newsletterForm.querySelector('button');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';

        setTimeout(function () {
            btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        }, 2000);
    });

    // --- Particle Effect in Hero ---
    var particlesContainer = document.getElementById('particles');
    var particleCount = 40;

    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (Math.random() * 100 + 100) + '%';
        particle.style.width = (Math.random() * 4 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }

    // --- AOS Init ---
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // --- Smooth reveal animation ---
    var style = document.createElement('style');
    style.textContent = '@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }';
    document.head.appendChild(style);

    // --- Survey123 Embed Auto-Resize ---
    var surveyEmbed = document.getElementById('surveyEmbed');

    if (surveyEmbed) {
        var SURVEY_ORIGINS = ['https://survey123.arcgis.com', 'https://survey123.arcgis.app'];
        var SURVEY_EVENTS = ['survey123:webform:formLoaded', 'survey123:onFormLoaded'];
        var SURVEY_MAX_HEIGHT = 20000;

        window.addEventListener('message', function (e) {
            if (SURVEY_ORIGINS.indexOf(e.origin) === -1) return;
            if (typeof e.data !== 'string') return;

            var payload;
            try {
                payload = JSON.parse(e.data);
            } catch (err) {
                return;
            }

            if (!payload || SURVEY_EVENTS.indexOf(payload.event) === -1) return;

            var height = parseInt(payload.contentHeight, 10);
            if (!height || height < 1) return;

            surveyEmbed.style.height = Math.min(height, SURVEY_MAX_HEIGHT) + 'px';
            surveyEmbed.classList.add('is-sized');

            if (typeof AOS !== 'undefined') AOS.refresh();
        });
    }


});
