---
---
{% include js/jquery-1.9.1.min.js %}
{% include js/jquery.jscroll.min.js %}
{% include js/simpleCart.min.js %}
{% include js/jquery.touchSwipe.min.js %}
{% include js/jquery.lazyload.js %}

$(function () {

    // Info toggle
    $('nav a.info-toggle').click(function (e) {
        $('nav .info').toggleClass('show');
        e.preventDefault();
    });

    // Swipe from left to open nav, and only do it on mobile
    var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (supportsTouch === true) {

        // Paging through screenshots
        $("#image-carousel-inner").swipe({
            swipeLeft: nextPage,
            swipeRight: prevPage,
            allowPageScroll: "auto"
        });

        function nextPage(event, direction) {
            $('#image-carousel-inner').click();
        };

        function prevPage(event, direction) {
            var carousel = $('#image-carousel-inner');
            var count = parseInt(document.getElementById('image-carousel-inner').className.split('step-').pop());
            var total = $('#image-carousel-inner img').length;
            if (count === 1) {
                carousel.removeClass().addClass('step-' + total);
            } else {
                carousel.removeClass().addClass('step-' + (count - 1));
            }
        };
    }

    // carousel
    var visibleImageNumber = 1,
        totalImages = $('#image-carousel-inner img').length;

    $('#image-carousel-inner').click(function () {
        if (visibleImageNumber < totalImages) {
            visibleImageNumber++;
        } else {
            visibleImageNumber = 1;
        };
        $('#image-carousel-inner').removeClass().addClass('step-' + visibleImageNumber);
    });

    //shop item page - show cart animation
    $('.js-item-add').on('click', function (e) {
        $("a.item_add").addClass('disabled');
        $("a.show_cart_button").addClass('visible');
        $('.cart-status').removeClass('hide');
        e.preventDefault();
    });

    // simpleCart.js config
    simpleCart({
        checkout: {
            type: "PayPal",
            email: "info@2dcloud.com"
        },

        shippingFlatRate: 0,

        cartColumns: [{
                attr: "name",
                label: "Name"
            },
            {
                view: "decrement",
                label: false,
                text: "-"
            },
            {
                attr: "quantity",
                label: "Qty"
            },
            {
                view: "increment",
                label: false,
                text: "+"
            },
            {
                attr: "total",
                label: "Total",
                view: 'currency'
            },
            {
                view: "remove",
                text: "Remove",
                label: false
            }
        ]

    });

});

$(window).bind("load", function () {

    if (simpleCart.quantity() > 0) {
        $('.cart-status').removeClass('hide');
    }

});