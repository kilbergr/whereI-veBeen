$(function() {
  var map,
  markers =[];
  function initialize() {

    var styles = [
  {
    featureType: "all",
    stylers: [
    { hue: "#00ffee" },
      { saturation: -50 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      
      { saturation: 80 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

 var mapOptions = {
      zoom: 5,
      center: {lat: 40.7033127, lng: -73.979681},
       mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

    var mapDiv = document.getElementById('map-canvas');
     
      google.maps.event.addListener(map, 'click', function(event) {
      addMarker(event.latLng);
     // google.maps.event.addDomListener(window, 'load', initialize);
    });
  }


  function addMarker(location) {
    //Add your code to add markers here
    var myLatlng = new google.maps.LatLng(location.lat, location.long)
    var marker = new google.maps.Marker({
    position: myLatlng,
    map: map
    });
    //
    markers.push(marker); 

    //console.log("Lat: "+ marker.position.A + " Long: " + marker.position.F);
   // var data = {place: {address: address, lat: marker.position.A, long: marker.position.F}};
    //console.log(event.latLng.A);
    //console.log(event.latLng.F);
  }


 initialize();

  function addPlaces() {
    $.getJSON("/places").done(function(data) {
        data.places.forEach(function(place) {
            addMarker(place);
            var html = placeHTML(place);
            $('#addedPoints').append(html);
        });
    });
  }

  function placeHTML(place) {
    return '<div data-id="' + place._id + '"><p><a href="/places/' + place._id + '/">' + place.address + 
           '</a></p><p>Latitude: ' + place.lat + ', Longitude: ' + place.long + '</p>' +
           '<p><a href="/places/' + place._id + '/edit">Change a place</a></p><hr></div>';
     }

addPlaces();
//google.maps.event.addDomListener(window, 'load', initialize);
$('#placesyouvebeen').click(function(e) {
    e.preventDefault();
    var html = '<br/><form id="newplaceform" action="/places" method="POST">' +
  '<div class="form-group">' +
    '<label for="name">Address: </label>' +
    '<input type="text" class="form-control" name="place[address]" id="address" autofocus>' +
  '</div>' +
  '<div class="form-group">' +
    '<label for="lat">Latitude: </label>' +
    '<input type="text" class="form-control" name="place[lat]" id="lat">' +
    '<label for="long">Longitude: </label>' +
    '<input type="text" class="form-control" name="place[long]" id="long">' +
  '</div>' +
  '<input type="submit" value="Add" class="btn btn-lg btn-success">' +
'</form>';

    $('#needID').after(html);
    $('#newplaceform').submit(function(e) {
      e.preventDefault();
      var address = $('#address').val();
      var lat = $('#lat').val();
      var long = $('#long').val();
      var data = {place: {address: address, lat: lat, long: long}};
    

      $.ajax({
        type: 'POST',
        url: '/places',
        data: data,
        dataType: 'json'
       }).done(function(data) {

         $('#addedPoints').append(placeHTML(data.place));
         $('#newplaceform').remove();
      });
    });
  });
});