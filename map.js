const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjczWFJKMkxVTTMifQ.eyJpc3MiOiJWNUtWNDhMTThUIiwiaWF0IjoxNjc0MjQ3NDAwLCJleHAiOjE2ODM3NjMyMDAsIm9yaWdpbiI6InZlcml6b24ubW13YXZlLm9uZSJ9.fFN_CP5AqQm0mcoyLHegspetPy1hc0To-oozTv-ZgS2g0BTewJRCPHCRDWllmfqMh_ERNLeRIlpTN3xc0f9aNw";

mapkit.init({
    authorizationCallback: function (done) {
        done(tokenID);
    }
});


var map = new mapkit.Map("map");
map.tracksUserLocation = true;
map.showsUserLocation = true;
let search = new mapkit.Search({ region: map.region });
search.autocomplete('searchterm', (error, data) => {
    if (error) {
        return;
    }
});


// var map = new mapkit.Map("map");
// map.tracksUserLocation = true;
// map.showsUserLocation = true;

map.region = myRegion;
// Listen for keyup in the input field
$('#mapLookup').keyup(function () {
    // Make sure it's not a zero length string
    if ($('#mapLookup').length > 0) {
        let search = new mapkit.Search({ region: map.region });
        search.autocomplete($('#mapLookup').val(), (error, data) => {
            if (error) {
                return;
            }
            // Unhide the result box
            $('#results').show();
            var results = "";
            // Loop through the results a build 
            data.results.forEach(function (result) {
                if (result.coordinate) {
                    // Builds the HTML it'll display in the results. This includes the data in the attributes so it can be used later
                    results = results + '<div class="mapSearchResultsItem" data-title="' + result.displayLines[0] + '" data-latitude="' + result.coordinate.latitude + '" data-longitude="' + result.coordinate.longitude + '" data-address="' + result.displayLines[1] + '"><b>' + result.displayLines[0] + '</b> ' + result.displayLines[1] + '</div>';
                }
            });
            // Display the results
            $('#results').html(results);
            // List for a click on an item we've just displayed
            $('.mapSearchResultsItem').click(function () {
                // Get all the data - you might want to write this into form fields on your page to capture the data if this map is part of a form.
                var latitude = $(this).data('latitude');
                var longitude = $(this).data('longitude');
                var title = $(this).data('title');
                var address = $(this).data('address');
                // Calc the new region
                var myRegion = new mapkit.CoordinateRegion(
                    new mapkit.Coordinate(latitude, longitude),
                    new mapkit.CoordinateSpan(0.01, 0.01)
                );
                // Clean up the map of old searches
                map.removeAnnotations(map.annotations);
                map.region = myRegion;
                // Add the new annotation
                var myAnnotation = new mapkit.MarkerAnnotation(new mapkit.Coordinate(latitude, longitude), {
                    color: "#9b6bcc",
                    title: title,
                    subtitle: address
                });
                map.addAnnotation(myAnnotation);
                // Hide the results box
                $('#results').hide();
            });
        });
    } else {
        $('#results').hide();
    }
});


var MarkerAnnotation = mapkit.MarkerAnnotation,
    clickAnnotation;
var sofi = new mapkit.Coordinate(33.9533738, -118.3390510),
    indi = new mapkit.Coordinate(39.79460, -86.23421);
    nyc = new mapkit.Coordinate(40.71298, -74.00720);

// mapkit.init({
//     authorizationCallback: function (done) {
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", "/services/jwt");
//         xhr.addEventListener("load", function () {
//             done(this.responseText);
//         });
//         xhr.send();
//     }
// });
// var map = new mapkit.Map("map");

// Setting properties on creation:
var sofiAnnotation = new MarkerAnnotation(sofi);
sofiAnnotation.color = "#7079F7";
sofiAnnotation.title = "SoFi Stadium";
sofiAnnotation.subtitle = "Inglewood, CA";
sofiAnnotation.selected = "true";
sofiAnnotation.glyphText = "🏈";

// Setting properties after creation:
var indiAnnotation = new MarkerAnnotation(indi);
indiAnnotation.color = "#EE79AC";
indiAnnotation.title = "Indianapolis Motor Speedway";
indiAnnotation.subtitle = "Indianapolis, IN";
indiAnnotation.selected = "true";
indiAnnotation.glyphText = "🏁";


var nycAnnotation = new MarkerAnnotation(nyc);
nycAnnotation.color = "#808080";
nycAnnotation.title = "New York City";
nycAnnotation.subtitle = "New York";
nycAnnotation.selected = "true";
nycAnnotation.glyphText = "🏙";

// Add and show both annotations on the map
map.showItems([sofiAnnotation, indiAnnotation, nycAnnotation]);

// Drop an annotation where a Shift-click is detected:
map.element.addEventListener("click", function (event) {
    if (!event.shiftKey) {
        return;
    }

    if (clickAnnotation) {
        map.removeAnnotation(clickAnnotation);
    }

    var coordinate = map.convertPointOnPageToCoordinate(new DOMPoint(event.pageX, event.pageY));
    clickAnnotation = new MarkerAnnotation(coordinate, {
        title: "Dropped Pin",
        color: "#ff0000"
    });
    map.addAnnotation(clickAnnotation);
});
