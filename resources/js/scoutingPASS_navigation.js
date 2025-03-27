document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchend", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var xThreshold = 0.3;
var slide = 0;

function startTouch(e) {
    initialX = e.touches[0].screenX;
};

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    var currentX = e.changedTouches[0].screenX;
    var diffX = initialX - currentX;

    // sliding horizontally
    if (diffX / screen.width > xThreshold) {
        // swiped left
        swipePage(1);
    } else if (diffX / screen.width < -xThreshold) {
        // swiped right
        swipePage(-1);
    }
    initialX = null;
};

function swipePage(increment) {
    if (qr_regenerate() == true) {
        slides = document.getElementById("main-panel-holder").children
        if (slide + increment < slides.length && slide + increment >= 0) {
            slides[slide].style.display = "none";
            slide += increment;
            window.scrollTo(0, 0);
            slides[slide].style.display = "table";
            // hack for starting cycle timer in telop for 2024
            if (slides[slide].id == 'teleop') {
                var start_force = document.getElementById('startForce_tct')
                if (start_force != null)
                {
                    timerForceStart(start_force.parentNode)
                }
            }
            document.getElementById('data').innerHTML = "";
            document.getElementById('copyButton').setAttribute('value', 'Copy Data');
            document.getElementById('copyHeadersButton').setAttribute('value', 'Copy Headers');
        }
    }
}