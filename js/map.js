var map;
var stocks = ["50.488060,30.444773","50.437356,30.494898","50.412421,30.535410","50.491118,30.651453","50.420296,30.666559"];
var markers = {};

google.maps.event.addDomListener(window, 'load', initialize(50.4551823, 30.5441464, 11));

$('.products').on('mouseover', '.product-item', function(){
    var availableIn = $(this).attr('data-available').split(',');
    for (var i = 0; i < availableIn.length; i++) {
        markers[availableIn[i]].setIcon('img/marker2.png');
    }
    $(this).on('mouseleave', function(){
        for (var i = 0; i < availableIn.length; i++) {
            markers[availableIn[i]].setIcon('img/marker1.png');
        }
    });
});

function initialize(centerLat, centerLng, zoom) {

    fixedElemOnScroll($('.sidebar'), 50, 0);

    var mapProp = {
        scrollwheel: false,
        center: {lat: centerLat, lng: centerLng},
        zoom:zoom,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);

    for (var i = 0; i < stocks.length; i++) {
        setMapMarker(stocks[i], map, i+1);
    };

}

function fixedElemOnScroll(el, pos, offset) {
    checkPos(el, pos);
    $(document).scroll(function() {
        checkPos(el, pos);
    });

    function checkPos(el, pos) {
        if ($(document).scrollTop() < pos - offset) {
            el.css('top', pos - $(document).scrollTop());
        } else {
            el.css('top', offset);
        }
    }
}

function setMapMarker(location, map, data) {
    var coord = location.split(',');
    var adLat = coord[0].trim();
    var adLng = coord[1].trim();
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(adLat, adLng),
        dat: data,
        icon: 'img/marker1.png'
    });
    marker.setMap(map);
    markers[marker.dat] = marker;
}