$(function() { 
    var user_location = ""
    $.getJSON("/home/location", {}, function(json) {
        user_location = json[0].city + ", " + json[0].country;
    });

    $('#mapino').gMap({
        address: user_location,
        zoom: 12 
    });


    $.getJSON("/search/list", { limit: 10 }, function(json) {
        if (json.length > 0) {
            for (i=0; i<json.length; i++) {
                var place = json[i];
                addLocation(place);
            }
        }
    });

    function addLocation(place) { 
        $('#mapino').gMap('addMarker',
            {
                latitude: place.coordinates[1],
                longitude: place.coordinates[0],
                content: "<strong>" + place.name + "</strong><br/><br/><a href='/places/" + place.id + "' class='btn btn-info'>View details »</a>"
            });
    }
});
