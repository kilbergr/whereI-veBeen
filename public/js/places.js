$(function() {
  var map,
  markers =[];
  function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 5,
      center: {lat: 40.7033127, lng: -73.979681}
    });

    var mapDiv = document.getElementById('map-canvas');

      google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
    });
  }


  function addMarker(location) {
    //Add your code to add markers here
    var myLatlng = new google.maps.LatLng(location.lat, location.long)
    var marker = new google.maps.Marker({
    position: myLatlng,
    map: map
    });
    markers.push(marker); 
    //console.log("Lat: "+ marker.position.A + " Long: " + marker.position.F);
   // var data = {place: {address: address, lat: marker.position.A, long: marker.position.F}};
    //console.log(event.latLng.A);
    //console.log(event.latLng.F);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

 initialize();


  function addPlaces() {
    $.getJSON("/places").done(function(data) {
        data.places.forEach(function(place) {
            var html = placeHTML(place);
            $('body').append(html);
        });
       // console.log(data);
    });
  }

  function placeHTML(place) {
    return '<div data-id="' + place._id + '"><p><a href="/places/' + place._id + '/">' + place.address + 
           '</a></p><p>Latitude: ' + place.lat + ', Longitude: ' + place.long + '</p>' +
           '<p><a href="/places/' + place._id + '/edit">Change a place</a></p></div>';
  }
addPlaces();

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
        addMarker(data.place);
         $('body').append(placeHTML(data.place));
         $('#newplaceform').remove();
      });
    });

  });


});