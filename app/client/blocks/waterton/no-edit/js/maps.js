var geocoder;
var geoResponce;
function getGeoCode(address, canvId) {
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var mapOptions = {
                zoom: 15,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById(canvId), mapOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert(status);
        }
    });
}
$(function() {
    geocoder = new google.maps.Geocoder();
    
    var address = $("#venue-address").html();
    
    getGeoCode(address, "map");
});