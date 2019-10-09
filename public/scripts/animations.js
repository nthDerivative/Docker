$(document).ready(function () {
    var $containerWidth = $(window).width();
    if ($containerWidth <= 800) {
        $("li").slideToggle("fast");

    }

    $("button").click(function () {
        var currentimg = $("button img").attr("src");
        if (currentimg == "/images/menu.png") {
            $("li").slideToggle("slow");
            $("button img").attr("src", "/images/close.png");
        } else {
            $("li").slideToggle("slow");
            $("button img").attr("src", "/images/menu.png");           
        }
        
    });

    $(window).resize(function () {
        var $containerWidth = $(window).width();
        var currentimg = $("button img").attr("src");
        waitForFinalEvent(function () {
            var isHidden = $("li").is(":hidden");
            if (isHidden == true) {

                if ($containerWidth > 1000) {
                    $("li").slideToggle("slow");
                    if (currentimg == "/images/menu.png") {
                        $("button img").attr("src", "/images/menu.png");
                    } else {
                        $("button img").attr("src", "/images/close.png");   
                    }
                }

            } else {
                if ($containerWidth <= 1000) {
                    $("li").slideToggle("fast");
                    if (currentimg == "/images/menu.png") {
                        $("button img").attr("src", "/images/menu.png");
                    } else {
                        $("button img").attr("src", "/images/close.png");   
                    }
                }
            }
        }, 500, "some unique string");
    });
});

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();