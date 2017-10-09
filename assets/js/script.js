(function(window) {

    var navicon = document.querySelector('.navicon');    
    var triggeredNav = false;
    navicon.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-target-id'); 
        var navItems = document.getElementById(targetId);

        if (navItems.classList.contains('nav-items--show')) {
            navItems.classList.remove('nav-items--show');
        } else {
            navItems.classList.add('nav-items--show');
            if (!triggeredNav) {
                var links = navItems.querySelectorAll('a');
                triggeredNav = true;
                for(var i=0, len=links.length;i<len;i++) {
                    links[i].addEventListener('click', function(e) {
                        navItems.classList.remove('nav-items--show');
                    }, false);
                }
            }
        }
    }, false);

    var skills = document.querySelectorAll('.skills__skill');
    var navbar = document.getElementById('navbar');
    var contentScroller = document.getElementById('content-scroller');
    var jumbotron = document.getElementById('jumbotron');
    
    document.addEventListener('DOMContentLoaded', function(){
        var headroom = new Headroom(navbar, {
            classes: {
                pinned: 'navbar--fixed',
                unpinned: 'headroom--unpinned'
            }
        });
        
        if (jumbotron) {
            var jRect = jumbotron.getBoundingClientRect();
            if (jRect.bottom < 0) {
                headroom.init();
                if (!navbar.classList.contains('navbar--white')) {
                    navbar.classList.add('navbar--white');
                }
            }
        }


        window.addEventListener('scroll', function() {
            if (jumbotron) {
                var jRect = jumbotron.getBoundingClientRect();
                if (jRect.bottom > 0 && navbar.classList.contains('navbar--white')) {
                    headroom.destroy();
                    navbar.classList.remove('navbar--white');
                }
            }
        }, false);

        if (navbar.classList.contains('navbar-home')) {
            var trigger = new ScrollTrigger({
                addHeight: true
            });
            
            createSkills();

            trigger.callScope = {
                navbarWhite: function() {
                    headroom.init();
                    if (!navbar.classList.contains('navbar--white')) {
                        navbar.classList.add('navbar--white');
                    }
                },
                navbarBlack: function() {
                    headroom.destroy();
                    navbar.classList.remove('navbar--white');
                }
            };
        } else {
            headroom.init();
        }
    });

    var defaultDuration = 10; // ms
    var edgeOffset = 60; // px
    zenscroll.setup(defaultDuration, edgeOffset);


    function createSkills() {
        // Frequency for rainbow color
        var frequency = 6 / skills.length;
        for(var i=0, len=skills.length;i<len;i++) {
            var skillValue = skills[i].getAttribute('data-value');
            var skillText = skills[i].getAttribute('data-text');
            // Rainbow coloring
            var r = Math.sin(frequency * i + 0) * (127) + 128, 
                g = Math.sin(frequency * i + 1) * (127) + 128, 
                b = Math.sin(frequency * i + 3) * (127) + 128;
            // Convert Rgb to hex
            var rgb = ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF);
            var str = rgb.toString(16).toUpperCase();
            var hex = '#' + ('000000'.substring(str.length) + str);

            var progress = new ProgressBar.Line(skills[i], {
                color: 'rgba('+ [r,g,b].join(',') +', .7)',
                duration: 3000,
                strokeWidth: 2,
                skill: '<b>'+ skillText +'</b>',
                easing: 'easeInOut',
                text: {
                    value: skillText,
                    style: {
                        color: 'inherit',
                        'margin-top': '5px'
                    }
                },
                step: function(state, bar) {
                    bar.setText(this.skill + ' &ndash; ' + Math.round(bar.value() * 100) + ' %');
                }
            });
            progress.animate(skillValue / 100);
        }
   }
}(window));
